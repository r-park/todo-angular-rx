import { escapeDirective } from './escape-directive';
import * as keyCodes from 'app/constants/key-codes';


describe('escape directive', () => {
  let element;
  let scope;


  beforeEach(() => {
    angular
      .module('test', [])
      .constant('keyCodes', keyCodes)
      .directive('escape', escapeDirective);

    angular.mock.module('test');

    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      scope.escapeHandler = sinon.spy();

      element = $compile('<input escape="escapeHandler()" type="text">')(scope);
      scope.$digest();
    });
  });


  function triggerKeyup(element, keyCode) {
    let event = new Event('keyup');
    event.keyCode = keyCode;
    element[0].dispatchEvent(event);
  }


  it('should call handler function when escape key is released (keyup event)', () => {
    triggerKeyup(element, keyCodes.ESCAPE);
    expect(scope.escapeHandler.callCount).toBe(1);
  });


  it('should unbind from `keyup` event when scope is destroyed', () => {
    triggerKeyup(element, keyCodes.ESCAPE);
    expect(scope.escapeHandler.callCount).toBe(1);

    scope.$destroy();

    triggerKeyup(element, keyCodes.ESCAPE);
    expect(scope.escapeHandler.callCount).toBe(1);
  });

});
