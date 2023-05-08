'use strict';

const xmlStr = `
    <list>
    <student>
        <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
    </list>
`;

const parser = new DOMParser();

const xmlDOM = parser.parseFromString(xmlStr, 'text/xml');

const list = xmlDOM.querySelector('list'),
    students = list.querySelectorAll('student');

const obj = {
    list: [
        {},
        {},
    ],
};

students.forEach((item, i) => {
    const name = item.querySelector('name');

    const firstName = name.querySelector('first').textContent;
    const lastName = name.querySelector('second').textContent;

    const fullName = `${firstName} ${lastName}`;

    const nameLang = name.getAttribute('lang');

    const age = item.querySelector('age').textContent;
    const prof = item.querySelector('prof').textContent;

    obj.list[i]['name'] = fullName;
    obj.list[i]['age'] = age;
    obj.list[i]['prof'] = prof;
    obj.list[i]['lang'] = nameLang;
});

console.log(obj);


const jsonObj = `{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
}`;

const jsObj = JSON.parse(jsonObj);
console.log(jsObj);