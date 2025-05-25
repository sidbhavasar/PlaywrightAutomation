module.exports = class Person{

    //add properties just like object
    age = 25

    //following is a property
    get location(){
        return "canada"
    }

    //following is a method
    fullName(){
        return "Siddhesh Bhavasar";
    }

}

//to access properties, create object
let person = new Person();
console.log(person.age);
console.log(person.location);