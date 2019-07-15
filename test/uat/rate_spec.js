const testContainer = require('../testsContainer')
const restClient = testContainer.restClient
const should = require('should')
const config = testContainer.config
const dataLoader = testContainer.dataLoader
const jwtUtil = require('../../utils/jwtUtil')(config)
const ratingDao = testContainer.ratingDao
require('../init')

describe('Add movie rating UAT tests', () => {
    beforeEach(async () => {
        await dataLoader.cleanup()
        await dataLoader.load(require('../../fixtures/dataset'))
    })

    let tests = [
    {
        given: 'a registered user A that has not rated Movie B which has 100 likes',
        when: 'he likes Movie B',
        then: 'the movies likes become 101 and a rating is stored',
        username: 'amerths@gmail.com',
        userId: 'testUser1',
        movieId: '1',
        ratingType: 'like',
        likesCount: 101,
        error: undefined
    },
    {
        given: 'a registered user A that has not rated Movie B which has 100 likes',
        when: 'he unlikes Movie B',
        then: 'an error returns, the movie likes stay the same and no rating is stored',
        username: 'amerths@gmail.com',
        userId: 'testUser1',
        movieId: '1',
        ratingType: 'unlike',
        likesCount: 101,
        error: 'user has not rated the movie.'
    },
    {
        given: 'a registered user B that has uploaded Movie B which has 100 likes',
        when: 'he likes Movie B',
        then: 'an error returns, the movie likes stay the same and no rating is stored',
        username: 'amerths@gmail.com',
        userId: 'testUser2',
        movieId: '1',
        ratingType: 'like',
        likesCount: 100,
        error: 'User not allowed to rate own movie.'
    },
    {
        given: 'a registered user A that has like Movie C which has 200 likes',
        when: 'he likes Movie C',
        then: 'an error returns, the movie likes stay the same and no rating is stored',
        username: 'amerths@gmail.com',
        userId: 'testUser1',
        movieId: '2',
        ratingType: 'like',
        likesCount: 200,
        error: 'User has already liked the movie.'
    },
    {
        given: 'a registered user A that has like Movie C which has 200 likes',
        when: 'he unlikes Movie C',
        then: 'the movies likes become 199, and a rating is deleted',
        username: 'amerths@gmail.com',
        userId: 'testUser1',
        movieId: '2',
        ratingType: 'unlike',
        likesCount: 199,
        error: undefined
    },
        {
            given: 'a registered user A that has like Movie C which has 200 likes and 10 hates',
            when: 'he hates Movie C',
            then: 'the movies likes become 199, the hates 11 and a rating is updated',
            username: 'amerths@gmail.com',
            userId: 'testUser1',
            movieId: '2',
            ratingType: 'hate',
            likesCount: 199,
            hatesCount: 11,
            error: undefined
        }
    ]

    tests.forEach((test) => {
        describe(`Given ${test.given}`, () => {
            describe(`When ${test.when}`, () => {
                it(`Then ${test.then}`, async () => {
                    let jwt = jwtUtil.create(test.userId, test.username)
                    let res = await restClient.rate({
                        movieId: test.movieId,
                        ratingType: test.ratingType
                    }, jwt)
                    if (test.error) {
                        should(res.body.error).eql(test.error)
                    } else {
                        should(res.statusCode).eql(200)
                        should(res.body.movie._id).be.ok()
                        should(res.body.movie._id).eql(test.movieId)
                        if (test.likesCount) {
                            should(res.body.movie.likesCount).eql(test.likesCount)
                        }
                        if (test.hatesCount) {
                            should(res.body.movie.hatesCount).eql(test.hatesCount)
                        }
                        const rating = await ratingDao.getRating(test.userId, test.movieId);
                        if (['like', 'hate'].indexOf(test.ratingType) !== -1 ) {
                            should(rating).be.ok()
                            should(rating.ratingType).eql(test.ratingType)
                        } else {
                            should(rating).be.null()
                        }
                    }

                })
            })
        })
    })

})