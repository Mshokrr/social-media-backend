/* eslint-disable no-unused-expressions */

import chai from 'chai';

process.env.NODE_ENV = 'test';
const { assert } = chai;

/**
 * Profile Model Test
 * @module ProfileModelTest
 */
describe('Profile Models', () => {
  /**
   * Docs
   * @param  {Function} done
   * @author @Shokr
   */
  before(done => {
    done();
  });

  it('should succeed because it is an example', done => {
    assert.equal(null, null);
    done();
  });
});
