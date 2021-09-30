/* eslint-disable no-unused-expressions */

import chai from 'chai';
import chaiHttp from 'chai-http';

// import app from '../app';

process.env.NODE_ENV = 'test';
const { expect } = chai;
chai.use(chaiHttp);

/**
 * Admin Routes Test
 * @module AdminRoutesTest
 */
describe('Admin Routes', () => {
  /**
   * Docs
   * @param  {Function} done
   * @author @Shokr
   */
  before(done => {
    done();
  });

  /**
   * After all tests are restore stubbed methods
   * @param  {Function} done
   * @author @Shokr
   */
  after(done => {
    done();
  });

  /**
   *
   * @param  {Function} done
   * @author @Shokr
   */
  describe('Admin URL', () => {
    it('should succeed because it is an example', done => {
      expect(null).to.be.null;
      done();
    });
  });
});
