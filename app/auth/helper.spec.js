/* eslint-disable no-unused-expressions */

import chai from 'chai';

process.env.NODE_ENV = 'test';
const { assert } = chai;

/**
 * Auth Helper Tests
 * @module AuthHelperTest
 */
describe('Auth Helpers', () => {
  /**
   * Tests Empty
   * @param {Function} done
   * @author @Shokr
   */
  it('should succeed because it is an example', done => {
    assert.equal(null, null);
    done();
  });
});
