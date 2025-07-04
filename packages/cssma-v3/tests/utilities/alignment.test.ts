import { describe, it, expect } from 'vitest';
import { baseUtility } from './base';
import { parseUtility } from '../../src/parser/parseUtility';

describe('parseUtility (alignment)', () => {
  describe('align-items', () => {
    it('should parse valid align-items classes', () => {
      const result = parseUtility('items-start');
      console.log('items-start:', result);
      expect(result).toEqual(baseUtility({ prefix: 'items', value: 'start', raw: 'items-start' }));
      expect(parseUtility('items-end')).toEqual(baseUtility({ prefix: 'items', value: 'end', raw: 'items-end' }));
      expect(parseUtility('items-center')).toEqual(baseUtility({ prefix: 'items', value: 'center', raw: 'items-center' }));
      expect(parseUtility('items-baseline')).toEqual(baseUtility({ prefix: 'items', value: 'baseline', raw: 'items-baseline' }));
      expect(parseUtility('items-stretch')).toEqual(baseUtility({ prefix: 'items', value: 'stretch', raw: 'items-stretch' }));
      expect(parseUtility('items-[safe]')).toEqual(baseUtility({ prefix: 'items', value: 'safe', arbitrary: true, arbitraryValue: 'safe', raw: 'items-[safe]' }));
      expect(parseUtility('items-[unsafe]')).toEqual(baseUtility({ prefix: 'items', value: 'unsafe', arbitrary: true, arbitraryValue: 'unsafe', raw: 'items-[unsafe]' }));
      expect(parseUtility('items-center!')).toEqual(baseUtility({ prefix: 'items', value: 'center', raw: 'items-center!', important: true }));
      expect(parseUtility('-items-end')).toEqual(baseUtility({ prefix: 'items', value: 'end', raw: '-items-end', negative: true }));
    });
    it('should return unknown for invalid align-items', () => {
      expect(parseUtility('items-')).toEqual({ type: 'unknown', raw: 'items-' });
    });
  });

  describe('align-content', () => {
    it('should parse valid align-content classes', () => {
      expect(parseUtility('content-center')).toEqual(baseUtility({ prefix: 'content', value: 'center', raw: 'content-center' }));
      expect(parseUtility('content-start')).toEqual(baseUtility({ prefix: 'content', value: 'start', raw: 'content-start' }));
      expect(parseUtility('content-end')).toEqual(baseUtility({ prefix: 'content', value: 'end', raw: 'content-end' }));
      expect(parseUtility('content-between')).toEqual(baseUtility({ prefix: 'content', value: 'between', raw: 'content-between' }));
      expect(parseUtility('content-around')).toEqual(baseUtility({ prefix: 'content', value: 'around', raw: 'content-around' }));
      expect(parseUtility('content-evenly')).toEqual(baseUtility({ prefix: 'content', value: 'evenly', raw: 'content-evenly' }));
      expect(parseUtility('content-stretch')).toEqual(baseUtility({ prefix: 'content', value: 'stretch', raw: 'content-stretch' }));
      expect(parseUtility('content-[safe]')).toEqual(baseUtility({ prefix: 'content', value: 'safe', arbitrary: true, arbitraryValue: 'safe', raw: 'content-[safe]' }));
      expect(parseUtility('content-center!')).toEqual(baseUtility({ prefix: 'content', value: 'center', raw: 'content-center!', important: true }));
    });
    it('should return unknown for invalid align-content', () => {
      expect(parseUtility('content-')).toEqual({ type: 'unknown', raw: 'content-' });
    });
  });

  describe('align-self', () => {
    it('should parse valid align-self classes', () => {
      expect(parseUtility('self-auto')).toEqual(baseUtility({ prefix: 'self', value: 'auto', raw: 'self-auto' }));
      expect(parseUtility('self-start')).toEqual(baseUtility({ prefix: 'self', value: 'start', raw: 'self-start' }));
      expect(parseUtility('self-end')).toEqual(baseUtility({ prefix: 'self', value: 'end', raw: 'self-end' }));
      expect(parseUtility('self-center')).toEqual(baseUtility({ prefix: 'self', value: 'center', raw: 'self-center' }));
      expect(parseUtility('self-stretch')).toEqual(baseUtility({ prefix: 'self', value: 'stretch', raw: 'self-stretch' }));
      expect(parseUtility('self-baseline')).toEqual(baseUtility({ prefix: 'self', value: 'baseline', raw: 'self-baseline' }));
      expect(parseUtility('self-[safe]')).toEqual(baseUtility({ prefix: 'self', value: 'safe', arbitrary: true, arbitraryValue: 'safe', raw: 'self-[safe]' }));
      expect(parseUtility('self-center!')).toEqual(baseUtility({ prefix: 'self', value: 'center', raw: 'self-center!', important: true }));
    });
    it('should return unknown for invalid align-self', () => {
      expect(parseUtility('self-')).toEqual({ type: 'unknown', raw: 'self-' });
    });
  });

  describe('justify-content', () => {
    it('should parse valid justify-content classes', () => {
      expect(parseUtility('justify-center')).toEqual(baseUtility({ prefix: 'justify', value: 'center', raw: 'justify-center' }));
      expect(parseUtility('justify-start')).toEqual(baseUtility({ prefix: 'justify', value: 'start', raw: 'justify-start' }));
      expect(parseUtility('justify-end')).toEqual(baseUtility({ prefix: 'justify', value: 'end', raw: 'justify-end' }));
      expect(parseUtility('justify-between')).toEqual(baseUtility({ prefix: 'justify', value: 'between', raw: 'justify-between' }));
      expect(parseUtility('justify-around')).toEqual(baseUtility({ prefix: 'justify', value: 'around', raw: 'justify-around' }));
      expect(parseUtility('justify-evenly')).toEqual(baseUtility({ prefix: 'justify', value: 'evenly', raw: 'justify-evenly' }));
      expect(parseUtility('justify-stretch')).toEqual(baseUtility({ prefix: 'justify', value: 'stretch', raw: 'justify-stretch' }));
      expect(parseUtility('justify-[safe]')).toEqual(baseUtility({ prefix: 'justify', value: 'safe', arbitrary: true, arbitraryValue: 'safe', raw: 'justify-[safe]' }));
      expect(parseUtility('justify-center!')).toEqual(baseUtility({ prefix: 'justify', value: 'center', raw: 'justify-center!', important: true }));
    });
    it('should return unknown for invalid justify-content', () => {
      expect(parseUtility('justify-')).toEqual({ type: 'unknown', raw: 'justify-' });
    });
  });

  describe('justify-items', () => {
    it('should parse valid justify-items classes', () => {
      expect(parseUtility('justify-items-start')).toEqual(baseUtility({ prefix: 'justify-items', value: 'start', raw: 'justify-items-start' }));
      expect(parseUtility('justify-items-end')).toEqual(baseUtility({ prefix: 'justify-items', value: 'end', raw: 'justify-items-end' }));
      expect(parseUtility('justify-items-center')).toEqual(baseUtility({ prefix: 'justify-items', value: 'center', raw: 'justify-items-center' }));
      expect(parseUtility('justify-items-stretch')).toEqual(baseUtility({ prefix: 'justify-items', value: 'stretch', raw: 'justify-items-stretch' }));
      expect(parseUtility('justify-items-[safe]')).toEqual(baseUtility({ prefix: 'justify-items', value: 'safe', arbitrary: true, arbitraryValue: 'safe', raw: 'justify-items-[safe]' }));
      expect(parseUtility('justify-items-center!')).toEqual(baseUtility({ prefix: 'justify-items', value: 'center', raw: 'justify-items-center!', important: true }));
    });
    it('should return unknown for invalid justify-items', () => {
      expect(parseUtility('justify-items-')).toEqual({ type: 'unknown', raw: 'justify-items-' });
    });
  });

  describe('justify-self', () => {
    it('should parse valid justify-self classes', () => {
      expect(parseUtility('justify-self-auto')).toEqual(baseUtility({ prefix: 'justify-self', value: 'auto', raw: 'justify-self-auto' }));
      expect(parseUtility('justify-self-start')).toEqual(baseUtility({ prefix: 'justify-self', value: 'start', raw: 'justify-self-start' }));
      expect(parseUtility('justify-self-end')).toEqual(baseUtility({ prefix: 'justify-self', value: 'end', raw: 'justify-self-end' }));
      expect(parseUtility('justify-self-center')).toEqual(baseUtility({ prefix: 'justify-self', value: 'center', raw: 'justify-self-center' }));
      expect(parseUtility('justify-self-stretch')).toEqual(baseUtility({ prefix: 'justify-self', value: 'stretch', raw: 'justify-self-stretch' }));
      expect(parseUtility('justify-self-[safe]')).toEqual(baseUtility({ prefix: 'justify-self', value: 'safe', arbitrary: true, arbitraryValue: 'safe', raw: 'justify-self-[safe]' }));
      expect(parseUtility('justify-self-center!')).toEqual(baseUtility({ prefix: 'justify-self', value: 'center', raw: 'justify-self-center!', important: true }));
    });
    it('should return unknown for invalid justify-self', () => {
      expect(parseUtility('justify-self-')).toEqual({ type: 'unknown', raw: 'justify-self-' });
    });
  });

  describe('place-content', () => {
    it('should parse valid place-content classes', () => {
      expect(parseUtility('place-content-center')).toEqual(baseUtility({ prefix: 'place-content', value: 'center', raw: 'place-content-center' }));
      expect(parseUtility('place-content-start')).toEqual(baseUtility({ prefix: 'place-content', value: 'start', raw: 'place-content-start' }));
      expect(parseUtility('place-content-end')).toEqual(baseUtility({ prefix: 'place-content', value: 'end', raw: 'place-content-end' }));
      expect(parseUtility('place-content-between')).toEqual(baseUtility({ prefix: 'place-content', value: 'between', raw: 'place-content-between' }));
      expect(parseUtility('place-content-around')).toEqual(baseUtility({ prefix: 'place-content', value: 'around', raw: 'place-content-around' }));
      expect(parseUtility('place-content-evenly')).toEqual(baseUtility({ prefix: 'place-content', value: 'evenly', raw: 'place-content-evenly' }));
      expect(parseUtility('place-content-stretch')).toEqual(baseUtility({ prefix: 'place-content', value: 'stretch', raw: 'place-content-stretch' }));
      expect(parseUtility('place-content-[safe]')).toEqual(baseUtility({ prefix: 'place-content', value: 'safe', arbitrary: true, arbitraryValue: 'safe', raw: 'place-content-[safe]' }));
      expect(parseUtility('place-content-center!')).toEqual(baseUtility({ prefix: 'place-content', value: 'center', raw: 'place-content-center!', important: true }));
    });
    it('should return unknown for invalid place-content', () => {
      expect(parseUtility('place-content-')).toEqual({ type: 'unknown', raw: 'place-content-' });
    });
  });

  describe('place-items', () => {
    it('should parse valid place-items classes', () => {
      expect(parseUtility('place-items-start')).toEqual(baseUtility({ prefix: 'place-items', value: 'start', raw: 'place-items-start' }));
      expect(parseUtility('place-items-end')).toEqual(baseUtility({ prefix: 'place-items', value: 'end', raw: 'place-items-end' }));
      expect(parseUtility('place-items-center')).toEqual(baseUtility({ prefix: 'place-items', value: 'center', raw: 'place-items-center' }));
      expect(parseUtility('place-items-stretch')).toEqual(baseUtility({ prefix: 'place-items', value: 'stretch', raw: 'place-items-stretch' }));
      expect(parseUtility('place-items-[safe]')).toEqual(baseUtility({ prefix: 'place-items', value: 'safe', arbitrary: true, arbitraryValue: 'safe', raw: 'place-items-[safe]' }));
      expect(parseUtility('place-items-center!')).toEqual(baseUtility({ prefix: 'place-items', value: 'center', raw: 'place-items-center!', important: true }));
    });
    it('should return unknown for invalid place-items', () => {
      expect(parseUtility('place-items-')).toEqual({ type: 'unknown', raw: 'place-items-' });
    });
  });

  describe('place-self', () => {
    it('should parse valid place-self classes', () => {
      expect(parseUtility('place-self-auto')).toEqual(baseUtility({ prefix: 'place-self', value: 'auto', raw: 'place-self-auto' }));
      expect(parseUtility('place-self-start')).toEqual(baseUtility({ prefix: 'place-self', value: 'start', raw: 'place-self-start' }));
      expect(parseUtility('place-self-end')).toEqual(baseUtility({ prefix: 'place-self', value: 'end', raw: 'place-self-end' }));
      expect(parseUtility('place-self-center')).toEqual(baseUtility({ prefix: 'place-self', value: 'center', raw: 'place-self-center' }));
      expect(parseUtility('place-self-stretch')).toEqual(baseUtility({ prefix: 'place-self', value: 'stretch', raw: 'place-self-stretch' }));
      expect(parseUtility('place-self-[safe]')).toEqual(baseUtility({ prefix: 'place-self', value: 'safe', arbitrary: true, arbitraryValue: 'safe', raw: 'place-self-[safe]' }));
      expect(parseUtility('place-self-center!')).toEqual(baseUtility({ prefix: 'place-self', value: 'center', raw: 'place-self-center!', important: true }));
    });
    it('should return unknown for invalid place-self', () => {
      expect(parseUtility('place-self-')).toEqual({ type: 'unknown', raw: 'place-self-' });
    });
  });
}); 