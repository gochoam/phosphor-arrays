/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import expect = require('expect.js');

import {
  find, findIndex, forEach, insert, lowerBound, move, remove, removeAt,
  reverse, rfind, rfindIndex, rforEach, rotate, upperBound
} from '../lib/index';


describe('phosphor-arrays', () => {

  describe('forEach()', () => {

    it('should execute a callback for each element in an array', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      forEach(data, v => { values.push(v); });
      expect(values).to.eql([1, 2, 3, 4, 5]);
    });

    it('should pass the index as the second arg to callback', () => {
      var data = [1, 2, 3, 4, 5];
      var indices: number[] = [];
      forEach(data, (v, i) => { indices.push(i); });
      expect(indices).to.eql([0, 1, 2, 3, 4]);
    });

    it('should support iterating from a start index', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      forEach(data, v => { values.push(v); }, 2);
      expect(values).to.eql([3, 4, 5]);
    });

    it('should support wrapping at the end of the array', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      forEach(data, v => { values.push(v); }, 2, true);
      expect(values).to.eql([3, 4, 5, 1, 2]);
    });

    it('should be a no-op of the start index is out of range', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      forEach(data, v => { values.push(v); }, -1);
      forEach(data, v => { values.push(v); }, 5);
      forEach(data, v => { values.push(v); }, -1, true);
      forEach(data, v => { values.push(v); }, 5, true);
      expect(values).to.eql([]);
    });

    it('should return the first value returned by the callback', () => {
      var data = [1, 2, 3, 4, 5];
      var r1 = forEach(data, v => { });
      var r2 = forEach(data, v => v);
      expect(r1).to.be(void 0);
      expect(r2).to.be(1);
    });

    it('should terminate iteration when the callback returns a value', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      var r = forEach(data, v => { values.push(v); if (v > 3) return v; });
      expect(values).to.eql([1, 2, 3, 4]);
      expect(r).to.be(4);
    });

  });

  describe('rforEach()', () => {

    it('should execute a callback for each element in an array in reverse', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      rforEach(data, v => { values.push(v); });
      expect(values).to.eql([5, 4, 3, 2, 1]);
    });

    it('should pass the index as the second arg to callback', () => {
      var data = [1, 2, 3, 4, 5];
      var indices: number[] = [];
      rforEach(data, (v, i) => { indices.push(i); });
      expect(indices).to.eql([4, 3, 2, 1, 0]);
    });

    it('should support iterating from a start index', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      rforEach(data, v => { values.push(v); }, 2);
      expect(values).to.eql([3, 2, 1]);
    });

    it('should support wrapping at the front of the array', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      rforEach(data, v => { values.push(v); }, 2, true);
      expect(values).to.eql([3, 2, 1, 5, 4]);
    });

    it('should be a no-op of the start index is out of range', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      rforEach(data, v => { values.push(v); }, -1);
      rforEach(data, v => { values.push(v); }, 5);
      rforEach(data, v => { values.push(v); }, -1, true);
      rforEach(data, v => { values.push(v); }, 5, true);
      expect(values).to.eql([]);
    });

    it('should return the first value returned by the callback', () => {
      var data = [1, 2, 3, 4, 5];
      var r1 = rforEach(data, v => { });
      var r2 = rforEach(data, v => v);
      expect(r1).to.be(void 0);
      expect(r2).to.be(5);
    });

    it('should terminate iteration when the callback returns a value', () => {
      var data = [1, 2, 3, 4, 5];
      var values: number[] = [];
      var r = rforEach(data, v => { values.push(v); if (v < 3) return v; });
      expect(values).to.eql([5, 4, 3, 2]);
      expect(r).to.be(2);
    });

  });

  describe('findIndex()', () => {

    it('should find the index of the first value matching a predicate', () => {
      var data = [1, 2, 3, 4, 5];
      var i = findIndex(data, v => v % 2 === 0);
      expect(i).to.be(1);
    });

    it('should support iterating from a start index', () => {
      var data = [1, 2, 3, 4, 5];
      var i = findIndex(data, v => v % 2 === 0, 2);
      expect(i).to.be(3);
    });

    it('should support wrapping at the end of the array', () => {
      var data = [1, 2, 3, 4, 5];
      var i = findIndex(data, v => v % 3 === 0, 3, true);
      expect(i).to.be(2);
    });

    it('should return `-1` if no value matches the predicate', () => {
      var data = [1, 2, 3, 4, 5];
      var i = findIndex(data, v => v % 7 === 0);
      expect(i).to.be(-1);
    });

  });

  describe('rfindIndex()', () => {

    it('should find the index of the last value matching a predicate', () => {
      var data = [1, 2, 3, 4, 5];
      var i = rfindIndex(data, v => v % 2 === 0);
      expect(i).to.be(3);
    });

    it('should support iterating from a start index', () => {
      var data = [1, 2, 3, 4, 5];
      var i = rfindIndex(data, v => v % 2 === 0, 2);
      expect(i).to.be(1);
    });

    it('should support wrapping at the front of the array', () => {
      var data = [1, 2, 3, 4, 5];
      var i = rfindIndex(data, v => v % 3 === 0, 1, true);
      expect(i).to.be(2);
    });

    it('should return `-1` if no value matches the predicate', () => {
      var data = [1, 2, 3, 4, 5];
      var i = rfindIndex(data, v => v % 7 === 0);
      expect(i).to.be(-1);
    });

  });

  describe('find()', () => {

    it('should find the first value matching a predicate', () => {
      var data = [1, 2, 3, 4, 5];
      var i = find(data, v => v % 2 === 0);
      expect(i).to.be(2);
    });

    it('should support iterating from a start index', () => {
      var data = [1, 2, 3, 4, 5];
      var i = find(data, v => v % 2 === 0, 2);
      expect(i).to.be(4);
    });

    it('should support wrapping at the end of the array', () => {
      var data = [1, 2, 3, 4, 5];
      var i = find(data, v => v % 3 === 0, 3, true);
      expect(i).to.be(3);
    });

    it('should return `undefined` if no value matches the predicate', () => {
      var data = [1, 2, 3, 4, 5];
      var i = find(data, v => v % 7 === 0);
      expect(i).to.be(void 0);
    });

  });

  describe('rfind()', () => {

    it('should find the last value matching a predicate', () => {
      var data = [1, 2, 3, 4, 5];
      var i = rfind(data, v => v % 2 === 0);
      expect(i).to.be(4);
    });

    it('should support iterating from a start index', () => {
      var data = [1, 2, 3, 4, 5];
      var i = rfind(data, v => v % 2 === 0, 2);
      expect(i).to.be(2);
    });

    it('should support wrapping at the front of the array', () => {
      var data = [1, 2, 3, 4, 5];
      var i = rfind(data, v => v % 3 === 0, 1, true);
      expect(i).to.be(3);
    });

    it('should return `undefined` if no value matches the predicate', () => {
      var data = [1, 2, 3, 4, 5];
      var i = rfind(data, v => v % 7 === 0);
      expect(i).to.be(void 0);
    });

  });

  describe('insert()', () => {

    it('should insert an element as a specific index', () => {
      var data = [1, 2, 3, 4, 5];
      insert(data, 2, 7);
      expect(data[2]).to.be(7);
    });

    it('should clamp the index to the bounds of the array', () => {
      var data = [1, 2, 3, 4, 5];
      insert(data, -9, 9);
      insert(data, 10, 7);
      expect(data[0]).to.be(9);
      expect(data[data.length - 1]).to.be(7);
    });

    it('should return the index at which the element was inserted', () => {
      var data = [1, 2, 3, 4, 5];
      var r1 = insert(data, 0, 6);
      var r2 = insert(data, 9, 7);
      var r3 = insert(data, 4, 8);
      expect(data[0]).to.be(6);
      expect(data[7]).to.be(7);
      expect(data[4]).to.be(8);
      expect(r1).to.be(0);
      expect(r2).to.be(6);
      expect(r3).to.be(4);
    });

  });

  describe('move()', () => {

    it('should move an element from one index to another', () => {
      var data = [1, 2, 3, 4, 5];
      move(data, 1, 3);
      move(data, 4, 0);
      expect(data).to.eql([5, 1, 3, 4, 2]);
    });

    it('should return `true` if the move was successful', () => {
      var data = [1, 2, 3, 4, 5];
      var r = move(data, 1, 2);
      expect(r).to.be(true);
    });

    it('should return `false` if either index is out of range', () => {
      var data = [1, 2, 3, 4, 5];
      var r1 = move(data, -1, 4);
      var r2 = move(data, 2, 10);
      var r3 = move(data, -4, 9);
      expect(r1).to.be(false);
      expect(r2).to.be(false);
      expect(r3).to.be(false);
    });

  });

  describe('removeAt()', () => {

    it('should remove an element at a specific index', () => {
      var data = [1, 2, 3, 4, 5];
      removeAt(data, 2);
      expect(data).to.eql([1, 2, 4, 5]);
      removeAt(data, 0);
      expect(data).to.eql([2, 4, 5]);
      removeAt(data, 2);
      expect(data).to.eql([2, 4]);
    });

    it('should return the removed value', () => {
      var data = [1, 2, 3, 4, 5];
      var r1 = removeAt(data, 1);
      var r2 = removeAt(data, 3);
      var r3 = removeAt(data, 0);
      expect(r1).to.be(2);
      expect(r2).to.be(5);
      expect(r3).to.be(1);
    });

    it('should return `undefined` if the index is out of range', () => {
      var data = [1, 2, 3, 4, 5];
      var r1 = removeAt(data, -3);
      var r2 = removeAt(data, 10);
      expect(r1).to.be(void 0);
      expect(r2).to.be(void 0);
    });

  });

  describe('remove()', () => {

    it('should remove the first occurrence of a value', () => {
      var data = [1, 2, 3, 4, 5];
      remove(data, 3);
      expect(data).to.eql([1, 2, 4, 5]);
      remove(data, 1);
      expect(data).to.eql([2, 4, 5]);
      remove(data, 5);
      expect(data).to.eql([2, 4]);
    });

    it('should return the index occupied by the value', () => {
      var data = [1, 2, 3, 4, 5];
      var r1 = remove(data, 1);
      var r2 = remove(data, 3);
      var r3 = remove(data, 5);
      expect(r1).to.be(0);
      expect(r2).to.be(1);
      expect(r3).to.be(2);
    });

    it('should return `-1` if the value is not in the array', () => {
      var data = [1, 2, 3, 4, 5];
      var r1 = remove(data, -1);
      var r2 = remove(data, 42);
      expect(r1).to.be(-1);
      expect(r2).to.be(-1);
    });

  });

  describe('reverse()', () => {

    it('should reverse an array in-place', () => {
      var data = [1, 2, 3, 4, 5];
      reverse(data);
      expect(data).to.eql([5, 4, 3, 2, 1]);
    });

    it('should support reversing a section of an array', () => {
      var data = [1, 2, 3, 4, 5];
      reverse(data, 2);
      expect(data).to.eql([1, 2, 5, 4, 3]);
      reverse(data, 0, 3);
      expect(data).to.eql([4, 5, 2, 1, 3]);
    });

    it('should clamp the indices to the array bounds', () => {
      var data = [1, 2, 3, 4, 5];
      reverse(data, -10, 10);
      expect(data).to.eql([5, 4, 3, 2, 1]);
      reverse(data, -10, 2);
      expect(data).to.eql([3, 4, 5, 2, 1]);
      reverse(data, 2, 10);
      expect(data).to.eql([3, 4, 1, 2, 5]);
    });

    it('should support a stop index smaller than a start index', () => {
      var data = [1, 2, 3, 4, 5];
      reverse(data, 3, 1);
      expect(data).to.eql([1, 4, 3, 2, 5]);
      reverse(data, 3, -10);
      expect(data).to.eql([2, 3, 4, 1, 5]);
      reverse(data, 10, 2);
      expect(data).to.eql([2, 3, 5, 1, 4]);
      reverse(data, 10, -10);
      expect(data).to.eql([4, 1, 5, 3, 2]);
    });

    it('should return a reference to the original array', () => {
      var data = [1, 2, 3, 4, 5];
      var r = reverse(data);
      expect(r).to.be(data);
    });

  });

  describe('rotate()', () => {

    it('should rotate the elements left by a positive delta', () => {
      var data = [1, 2, 3, 4, 5];
      rotate(data, 2);
      expect(data).to.eql([3, 4, 5, 1, 2]);
      rotate(data, 12);
      expect(data).to.eql([5, 1, 2, 3, 4]);
    });

    it('should rotate the elements right by a negative delta', () => {
      var data = [1, 2, 3, 4, 5];
      rotate(data, -2);
      expect(data).to.eql([4, 5, 1, 2, 3]);
      rotate(data, -12);
      expect(data).to.eql([2, 3, 4, 5, 1]);
    });

    it('should be a no-op for a zero delta', () => {
      var data = [1, 2, 3, 4, 5];
      rotate(data, 0);
      expect(data).to.eql([1, 2, 3, 4, 5]);
    });

    it('should return a reference to the original array', () => {
      var data = [1, 2, 3, 4, 5];
      var r = rotate(data, 2);
      expect(r).to.be(data);
    });

  });

  describe('lowerBound()', () => {

    it('should return the index of the first element `>=` a value', () => {
      var data = [1, 2, 2, 3, 3, 4, 5, 5];
      var lt = (a: number, b: number) => a < b;
      var r1 = lowerBound(data, -5, lt);
      var r2 = lowerBound(data, 0, lt);
      var r3 = lowerBound(data, 3, lt);
      var r4 = lowerBound(data, 5, lt);
      expect(r1).to.be(0);
      expect(r2).to.be(0);
      expect(r3).to.be(3);
      expect(r4).to.be(6);
    });

    it('should return `array.length` if there is no qualifying value', () => {
      var data = [1, 2, 2, 3, 3, 4, 5, 5];
      var lt = (a: number, b: number) => a < b;
      var r1 = lowerBound(data, 9, lt);
      var r2 = lowerBound(data, 19, lt);
      var r3 = lowerBound(data, 29, lt);
      expect(r1).to.be(8);
      expect(r2).to.be(8);
      expect(r3).to.be(8);
    });

  });

  describe('upperBound()', () => {

    it('should return the index of the first element `>` a value', () => {
      var data = [1, 2, 2, 3, 3, 4, 5, 5];
      var lt = (a: number, b: number) => a < b;
      var r1 = upperBound(data, -5, lt);
      var r2 = upperBound(data, 0, lt);
      var r3 = upperBound(data, 2, lt);
      var r4 = upperBound(data, 3, lt);
      expect(r1).to.be(0);
      expect(r2).to.be(0);
      expect(r3).to.be(3);
      expect(r4).to.be(5);
    });

    it('should return `array.length` if there is no qualifying value', () => {
      var data = [1, 2, 2, 3, 3, 4, 5, 5];
      var lt = (a: number, b: number) => a < b;
      var r1 = upperBound(data, 9, lt);
      var r2 = upperBound(data, 19, lt);
      var r3 = upperBound(data, 29, lt);
      expect(r1).to.be(8);
      expect(r2).to.be(8);
      expect(r3).to.be(8);
    });

  });

});
