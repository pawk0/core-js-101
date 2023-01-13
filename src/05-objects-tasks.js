/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return width * height;
    },
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = Object.create(proto);
  Object.assign(obj, JSON.parse(json));
  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

// class Selector {
//   constructor(value) {
//     this.value = value;
//   }
//
//   stringify() {
//     return this.value;
//   }
// }
//
// class ElementSelector extends Selector {
// }
//
// class IdSelector extends Selector {
//   stringify() {
//     return `#${this.value}`;
//   }
// }
//
// class ClassSelector extends Selector {
//   stringify() {
//     return `.${this.value}`;
//   }
// }
//
// class AttrSelector extends Selector {
//   stringify() {
//     return `[${this.value}]`;
//   }
// }
//
// class PseudoClassSelector extends Selector {
//   stringify() {
//     return `:${this.value}`;
//   }
// }
//
// class PseudoElementSelector extends Selector {
//   stringify() {
//     return `::${this.value}`;
//   }
// }
//
// class _Combinator extends Selector {
//   stringify() {
//     // return this.value !== ' ' ? ` ${this.value} ` : this.value;
//     return ` ${this.value} `;
//   }
// }
//
// class SelectorBuilder {
//   constructor(...selectors) {
//     SelectorBuilder.checkOrder(selectors);
//
//
//     this.selectors = selectors;
//   }
//
//   static checkOrder(selectors) {
//     const order = [
//       'ElementSelector',
//       'IdSelector',
//       'ClassSelector',
//       'AttrSelector',
//       'PseudoClassSelector',
//       'PseudoElementSelector',
//     ];
//
//     const classNames = selectors.map((sel) => sel.constructor.name);
//
//     if (classNames.includes('_Combinator')) {
//       return;
//     }
//
//     const indexes = classNames.map((cName) => order.indexOf(cName));
//
//     for (let i = 0; i < indexes.length - 1; i += 1) {
//       if (indexes[i] > indexes[i + 1]) {
//         throw new Error('Selector parts should be arranged in the following order: ' +
//           'element, id, class, attribute, pseudo-class, pseudo-element');
//       }
//     }
//   }
//
//   static element(value) {
//     return new SelectorBuilder(new ElementSelector(value));
//   }
//
//   element(value) {
//     if (this.selectors.some((sel) => (sel instanceof ElementSelector))) {
//       throw new Error('Element, id and pseudo-element ' +
//         'should not occur more then one time inside the selector');
//     }
//     return new SelectorBuilder(...this.selectors, new ElementSelector(value));
//   }
//
//   static id(value) {
//     return new SelectorBuilder(new IdSelector(value));
//   }
//
//   id(value) {
//     if (this.selectors.some((sel) => (sel instanceof IdSelector))) {
//       throw new Error('Element, id and pseudo-element ' +
//         'should not occur more then one time inside the selector');
//     }
//     return new SelectorBuilder(...this.selectors, new IdSelector(value));
//   }
//
//   static class(value) {
//     return new SelectorBuilder(new ClassSelector(value));
//   }
//
//   class(value) {
//     return new SelectorBuilder(...this.selectors, new ClassSelector(value));
//   }
//
//   static pseudoElement(value) {
//     return new SelectorBuilder(new PseudoElementSelector(value));
//   }
//
//   pseudoElement(value) {
//     if (this.selectors.some((sel) => (sel instanceof PseudoElementSelector))) {
//       throw new Error('Element, id and pseudo-element should not ' +
//         'occur more then one time inside the selector');
//     }
//     return new SelectorBuilder(...this.selectors, new PseudoElementSelector(value));
//   }
//
//   static pseudoClass(value) {
//     return new SelectorBuilder(new PseudoClassSelector(value));
//   }
//
//   pseudoClass(value) {
//     return new SelectorBuilder(...this.selectors, new PseudoClassSelector(value));
//   }
//
//   static attr(value) {
//     return new SelectorBuilder(new AttrSelector(value));
//   }
//
//   attr(value) {
//     return new SelectorBuilder(...this.selectors, new AttrSelector(value));
//   }
//
//   static combine(selector1, combinator, selector2) {
//     return new SelectorBuilder(
//       ...selector1.selectors,
//       new _Combinator(combinator),
//       ...selector2.selectors,
//     );
//   }
//
//   stringify() {
//     return this.selectors.map((sel) => sel.stringify())
//       .join('');
//   }
// }
//
//
// const cssSelectorBuilder = SelectorBuilder;

const cssSelectorBuilder = {
  element(/* value */) {
    throw new Error('Not implemented');
  },

  id(/* value */) {
    throw new Error('Not implemented');
  },

  class(/* value */) {
    throw new Error('Not implemented');
  },

  attr(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoClass(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoElement(/* value */) {
    throw new Error('Not implemented');
  },

  combine(/* selector1, combinator, selector2 */) {
    throw new Error('Not implemented');
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
