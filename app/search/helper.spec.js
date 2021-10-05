/* eslint-disable no-unused-expressions */

import chai from 'chai';

process.env.NODE_ENV = 'test';
const { assert } = chai;

/**
 * Search Helper Tests
 * @module SearchHelperTest
 */
describe('Search Helpers', () => {
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
