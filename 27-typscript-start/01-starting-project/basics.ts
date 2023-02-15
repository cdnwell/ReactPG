// Primitives : number, string, boolean
// More complex types : arrays, objects
// Function types, parameters

// Primitives

let age: number;

age = 12;

// type은 lower case로 시작한다.
// Number와 같이 대문자로 시작하면 자바스크립트의 Number 객체를 가리키게 된다.
let userName: string;

userName = "Max";

let isInstructor: boolean;

isInstructor = true;

// More complex types

// string array
let hobbies: string[];

hobbies = ["Sports", "Cooking"];

type Person = {
  name: string;
  age: number;
};

// 기본 타입 : any로 암묵적으로 정의되지 않은 변수의 상태를 정의한다.
// let person: any;
// 여기서 person은 객체를 생성하는 것이 아니라 타입스크립트의 기능을 활용하고 있는겁니다.
// 아래와 같은 name 필드와 값 필드의 속성이 맞는 객체만 저장 가능해집니다.
// let person: {
//   name: string;
//   age: number;
// };

let person: Person;

person = {
  name: "Max",
  age: 32,
};

// 빨간 줄이 그어짐
// person = {
//     imEmployee : true,
// }

// 만일 객체를 여러개 가진 people 배열을 만든다고 하면 아래와 같이 표현할 수 있다.
let people: {
  name: string;
  age: number;
}[];

// ------------------------- //
// Type inference : 타입 추론 //
// ------------------------- //

// let course = 'React - The Complete Guide';

// 기본적으로 타입스크립트는 가능한 많은 타입을 유추하려 하기 때문에
// 아래 코드를 오류로 인식합니다.
// course = 1234;

// 이렇게 타입 추론 기능을 활용해서 코드를 작성하는 게 권장되는 방식입니다.
// 명시적으로 타입을 지정하지 말고 타입 추론을 사용하는 것이 좋습니다.

// ------------------- //
// 유니온 유형 사용하기 //
// ------------------- //

// 한 개 이상의 타입을 지정할 수 있게 해주는 기능으로 유니온(union) 타입이라는 기능이 있습니다.

let course: string | number = "React - The Complete Guide";

// 이제 아래 코드에 오류 표시가 생기지 않고 두 가지 타입이 저장 가능해집니다.
course = 12345;
// 유니온 타입은 타입스크립트의 핵심 기능 중 하나로 값과 타입을 좀 더 유연하게 정의할 수 있게 해줍니다.

// ----------------- //
// Functions & types //
// ----------------- //

function add(a: number, b: number): number | string {
  return a + b;
}

function print(value: any) {
  console.log(value);
}

// Generics

function insertAtBeginning(array: any[], value: any) {
  const newArray = [value, ...array];
  return newArray;
}
