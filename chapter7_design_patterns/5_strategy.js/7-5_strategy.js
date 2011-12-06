var validator = {
    types: {},
    messages: [],
    config: {},
    
    validate: function (data) {
        var i, msg, type, checker, result_ok; // メッセージをすべてリセット
        this.messages = [];
        for (i in data) {
            if (data.hasOwnProperty(i)) {
                type = this.config[i];
                checker = this.types[type];
                if (!type) {
                    continue; // 検証する必要がない
                }
                if (!checker) { // これは変だ
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    }; 
                }
                result_ok = checker.validate(data[i]);
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg); 
                }
            } 
        }
        return this.hasErrors(); 
    },
    // ヘルパー
    hasErrors: function () {
        return this.messages.length !== 0; 
    }
};

// 空の値でないか検査
validator.types.isNonEmpty = {
    validate: function (value) { return value !== "";},
    instructions: "the value cannot be empty" 
};

// 値かが数字か検査 
validator.types.isNumber = {
    validate: function (value) { return !isNaN(value);},
    instructions: "the value can only be a valid number, e.g. 1, 3.14 or 2010"
 };

// 値が英数字か検査
validator.types.isAlphaNum = {
    validate: function (value) { return !/[^a-z0-9]/i.test(value);},
    instructions: "the value can only contain characters and numbers, no special symbols"
};

//このデータをバリデーションすることを考える
var data = {
    first_name: "Super",
    last_name: "Man",
    age: "unknown",
    username: "o_O"
};

//こうやってValidatorを設定してvalidateすると...
validator.config = { 
    first_name: 'isNonEmpty',
    age: 'isNumber', 
    username: 'isNonEmpty'
};
validator.validate(data);
if (validator.hasErrors()) {
    print(validator.messages.join("\n")); 
}

//こんなんが出て欲しい
//Invalid value for *age*, the value can only be a valid number, e.g. 1, 3.14 or 2010
//Invalid value for *username*, the value can only contain characters and numbers, no special symbols

