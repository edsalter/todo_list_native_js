/* global jasmine, angular, describe, beforeEach, afterEach, module, inject, it, expect, spyOn, _  */

describe('Todos', function () {

    'use strict';

    var myTodo = new Todos();
      /*
          Method tests
      */
      it('should be registered', function () {
          expect(myTodo).not.toBeNull();
      });

      it('inital lenth of todos should be 0', function () {
          expect(myTodo.getTodos().length).toEqual(0);
      });

      describe('Methods:', function(){
        describe('addTodo("Test 1")', function () {
          it('should add one todo, total lenth is now 1', function () {
              expect(myTodo.addTodo("Test 1").length).toEqual(1);
          });
        });

        describe('addTodo("Test 2")', function () {
          it('should add another todo, total lenth is now 2', function () {
              expect(myTodo.addTodo("Test 2").length).toEqual(2);
          });
        });

        describe('removeTodo("Test 1")', function () {
          it('should remove todo, total lenth is now 1', function () {
              expect(myTodo.removeTodo("Test 1").length).toEqual(1);
          });
        });
      });
});