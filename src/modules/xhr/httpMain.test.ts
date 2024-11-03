import { expect } from 'chai';
import sinon from 'sinon';
import AuthApi from '../../api/authApi.ts';
import { HTTPTransport } from './httpMain.ts';

describe('AuthApi', () => {
  describe('GET user request', () => {
    it('should make a GET request to /auth/user', async () => {
      const fakeResponse = {
        status: 200,
        response: JSON.stringify({ userId: 1, name: 'John Doe' }),
      };

      const getStub = sinon.stub(HTTPTransport, 'get').resolves(fakeResponse as XMLHttpRequest);

      const response = await AuthApi.me();

      expect(getStub.called).to.equal(true);
      expect(getStub.firstCall.args[0]).to.equal('/auth/user');
      expect(getStub.firstCall.args[1]).to.deep.equal(undefined);
      expect(response).to.deep.equal(fakeResponse);

      getStub.restore();
    });
  });
});
