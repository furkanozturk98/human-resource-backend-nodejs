module.exports =  {
    extends : [
        "plugin:@typescript-eslint/recommended",
    ],
    parser        : "@typescript-eslint/parser",
    parserOptions : {
        ecmaVersion : 2021,
        parser      : "@typescript-eslint/parser",
        sourceType  : "module",
    },
    rules : {
        "no-else-return"              : ["error", {allowElseIf : false}],
        "vue/max-attributes-per-line" : "off",
        'key-spacing'                 : [ 'warn', {
            'singleLine' : {
                'beforeColon' : true,
                'afterColon'  : true
            },
            'multiLine' : {
                'beforeColon' : true,
                'afterColon'  : true
            },
            "align" : {
                "beforeColon" : true,
                "afterColon"  : true,
                "on"          : "colon"
            }
        }],
    },
};
