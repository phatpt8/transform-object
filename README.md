![Issues](https://img.shields.io/github/issues/phatpt8/transform-object.svg?style=flat-square)
![Tweets](https://img.shields.io/twitter/url/https/github.com/phatpt8/transform-object.svg?style=social)

# TransformObject

A utility class that help transform Object data to array of pairs to support React UI loop.

## Rationale

When using React, sometimes you will face some UI challenges. Take this as an example:

```jsx
  // The problem
  class ReactComponent {
    render() {
      const objectData = { /* ... */ }
      return (
        <>
          <row>
            <col>{objectData.data1}</col>
            <col>{objectData.data2}</col>
          </row>
          <row>
            <col>{objectData.data3}</col>
            <col>{objectData.data4}</col>
          </row>
          <row>
            <col>{objectData.data5}</col>
            <col>{objectData.data6}</col>
          </row>
        </>
      );
    }
  }
```
```jsx
  // How can you achieve this:
  class ReactComponent {
    render() {
      const objectData = { /* ... */ }
      return (
        <>
          {toArrayOf2Pairs(objectData).map(([data1, data2]) => (
            <row>
              <col>{data1}</col>
              <col>{data2}</col>
            </row>
          ))}
        </>
      );
    }
  }
```
That is why I create **TransformObject** to solve above issue. Creating a class to achieve the abstraction in coding, make a clear goal of the transformation of data before and after through **TransformObject**.

## Usage

```js
  /*
    class TransformObject()
    @param[Object]: objectData - object data
    @param[Array]: struct - favor struct
    @param[Number]: pair - Data in each element of array
  */
  const transformer = new TransformObject(objectData, ['key', 'value'], 2);
  transformer.valueOf() // Output: [ [data1, data2], [data3, data4], [data5, data6] ]

  const transformer = new TransformObject();
  transformer.STRUCT = ['label', 'childObj'];
  transformer.PAIR = 3;
  transformer.transform(objectData);
  
  const transformer = new TransformObject(objectData);
  for (const [key, value] of transformer) {
    // ...
  }
```

## Installation

```bash
# yarn
yarn add transform-object

# npm
npm install transform-object --save
```

## Module usage

### ES6 module

```js
import TransformObject from 'transform-object';
```

### CommonJS

If you are in a CommonJS environment (eg [Node](https://nodejs.org)), then **you will need to add `.default` to your import**:

```js
const TransformObject = require('transform-object').default;
```
