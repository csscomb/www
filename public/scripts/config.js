(function() {
    var options = [{
        id: 'remove-empty-rulesets',
        variants: [{
            hint: 'Remove empty rulesets',
            code: '.a {\n    color: tomato;\n}\n ',
            value: true
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato;\n}\n.b{}',
            value: null
        }]
    }, {
        id: 'always-semicolon',
        variants: [{
            hint: 'Add missing semicolons',
            code: '.a {\n    color: tomato;\n}',
            value: true
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato\n}',
            value: null
        }]
    }, {
        id: 'color-case',
        variants: [{
            hint: 'Set colors to lowercase',
            code: '.a {\n    color: #fff;\n    background-color: #aaa;\n}',
            value: 'lower'
        }, {
            hint: 'Set colors to uppercase',
            code: '.a {\n    color: #FFF;\n    background-color: #AAA;\n}',
            value: 'upper'
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: #fff;\n    background-color: #AAA;\n}',
            value: null
        }]
    }, {
        id: 'block-indent',
        variants: [{
            hint: 'Set block indent to a tab',
            code: '.a {\n\tcolor: tomato;\n\t.b {\n\t\tcolor: salmon;\n\t}\n}',
            value: '\t'
        }, {
            hint: 'Set block indent to 2 spaces',
            code: '.a {\n  color: tomato;\n  .b {\n    color: salmon;\n  }\n}',
            value: "  "
        }, {
            hint: 'Set block indent to 4 spaces',
            code: '.a {\n    color: tomato;\n    .b {\n        color: salmon;\n    }\n}',
            value: "    "
        }, {
            hint: 'Leave code untouched',
            code: '.a {\ncolor: tomato;\n  .b {\n color: salmon;\n}\n}',
            value: null
        }]
    }, {
        id: 'color-shorthand',
        variants: [{
            hint: 'Expand hexadecimal colors',
            code: '.a {\n    color: #ffcc00;\n    background: #cccccc;\n}',
            value: false
        }, {
            hint: 'Use shorthands for hexadecimal colors',
            code: '.a {\n    color: #fc0;\n    background: #ccc;\n}',
            value: true
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: #ffcc00;\n    background: #ccc;\n}',
            value: null
        }]
    }, {
        id: 'element-case',
        variants: [{
            hint: 'Set selectors to lowercase',
            code: 'li > a {\n    color: tomato;\n}',
            value: 'lower'
        }, {
            hint: 'Set selectors to uppercase',
            code: 'LI > A {\n    color: tomato;\n}',
            value: 'upper'
        }, {
            hint: 'Leave code untouched',
            code: 'LI > a {\n    color: tomato;\n}',
            value: null
        }]
    }, {
        id: 'eof-newline',
        variants: [{
            hint: 'Add line break at EOF',
            code: '.a {\n    color: tomato;\n}\n ',
            value: true
        }, {
            hint: 'Remove line break at EOF',
            code: '.a {\n    color: tomato;\n}',
            value: false
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato\n}',
            value: null
        }]
    }, {
        id: 'leading-zero',
        variants: [{
            hint: 'Add leading zero',
            code: '.a {\n    padding: 0.1vh;\n    font-size: 0.5em;\n}',
            value: true
        }, {
            hint: 'Remove leading zero',
            code: '.a {\n    padding: .1vh;\n    font-size: .5em;\n}',
            value: false
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    padding: .1vh;\n    font-size: 0.5em;\n}',
            value: null
        }]
    }, {
        id: 'quotes',
        variants: [{
            hint: 'Use single quotes',
            code: 'p[href^=\'https://\']:before {\n    content: \'secure\'\n}',
            value: 'single'
        }, {
            hint: 'Use double quotes',
            code: 'p[href^="https://"]:before {\n    content: "secure"\n}',
            value: 'double'
        }, {
            hint: 'Leave code untouched',
            code: 'p[href^="https://"]:before {\n    content: \'secure\'\n}',
            value: null
        }]
    }, {
        id: 'sort-order-fallback',
        variants: [{
            hint: 'Sort unknown properties alphabetically',
            code: '.a {\n    color: tomato;\n    height: 0;\n    top: 0;\n}',
            value: 'abc'
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    height: 0;\n    top: 0;\n    color: tomato;\n}',
            value: null
        }]
    }, {
        id: 'space-after-colon',
        variants: [{
            hint: 'Add a space after colon',
            code: '.a {\n    color: tomato;\n    top: 0;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces after colon',
            code: '.a {\n    color:tomato;\n    top:0;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color:tomato;\n    top: 0;\n}',
            value: null
        }]
    }, {
        id: 'space-after-combinator',
        variants: [{
            hint: 'Add a space after combinator',
            code: '.a > span {\n    color: tomato;\n}\n.b > span {\n    color: salmon;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces after combinator',
            code: '.a >span {\n    color: tomato;\n}\n.b >span {\n    color: salmon;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a >span {\n    color: tomato;\n}\n.b > span {\n    color: salmon;\n}',
            value: null
        }]
    }, {
        id: 'space-between-declarations',
        variants: [{
            hint: 'Add a line break between declarations',
            code: '.a {\n    color: tomato;\n    top: 0;\n    height: 0;\n}',
            value: '\n'
        }, {
            hint: 'Add a space between declarations',
            code: '.a {\n    color: tomato; top: 0; height: 0;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces between declarations',
            code: '.a {\n    color: tomato;top: 0;height: 0;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato; top: 0;\n    height: 0;\n}',
            value: null
        }]
    }, {
        id: 'space-before-opening-brace',
        variants: [{
            hint: 'Add a line break before opening brace',
            code: '.a\n{\n    color: tomato;\n}',
            value: '\n'
        }, {
            hint: 'Add a space before opening brace',
            code: '.a {\n    color: tomato;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces before opening brace',
            code: '.a{\n    color: tomato;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato\n}',
            value: null
        }]
    }, {
        id: 'space-after-opening-brace',
        variants: [{
            hint: 'Add a line break after opening brace',
            code: '.a {\n    color: tomato;\n}',
            value: '\n'
        }, {
            hint: 'Add a space after opening brace',
            code: '.a { color: tomato;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces after opening brace',
            code: '.a{color: tomato;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato\n}',
            value: null
        }]
    }, {
        id: 'space-after-selector-delimiter',
        variants: [{
            hint: 'Add a line break after selector delimiter',
            code: '.a,\n.b {\n    color: tomato;\n}',
            value: '\n'
        }, {
            hint: 'Add a space after selector delimiter',
            code: '.a, .b {\n    color: tomato;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces after selector delimiter',
            code: '.a,.b {\n    color: tomato;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a, .b {\n    color: tomato\n}',
            value: null
        }]
    }, {
        id: 'space-before-selector-delimiter',
        variants: [{
            hint: 'Add a space before selector delimiter',
            code: '.a , .b {\n    color: tomato;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces before selector delimiter',
            code: '.a, .b {\n    color: tomato;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a, .b {\n    color: tomato\n}',
            value: null
        }]
    }, {
        id: 'space-before-closing-brace',
        variants: [{
            hint: 'Add a line break before closing brace',
            code: '.a {\n    color: tomato;\n}',
            value: '\n'
        }, {
            hint: 'Add a space before closing brace',
            code: '.a {\n    color: tomato; }',
            value: ' '
        }, {
            hint: 'Remove spaces before closing brace',
            code: '.a {\n    color: tomato;}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato\n}',
            value: null
        }]
    }, {
        id: 'always-semicolon',
        variants: [{
            hint: 'Add missing semicolons',
            code: '.a {\n    color: tomato;\n}',
            value: true
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato\n}',
            value: null
        }]
    }, {
        id: 'always-semicolon',
        variants: [{
            hint: 'Add missing semicolons',
            code: '.a {\n    color: tomato;\n}',
            value: true
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato\n}',
            value: null
        }]
    }];

    function handleClick() {
        var i = parseInt(this.dataset.index);
        var value = this.dataset.value;
        var id = options[i].id;
        updateConfig(id, value);

        i = i + 1;
        i < options.length ? displayOption(i) : displayConfig();
    }

    function updateConfig(id, value) {
        value = value === 'true' ? true :
            value === 'false' ? false :
            value === 'null' ? null :
            value;
        if (value !== null) config[id] = value;
    }

    function displayOption(index) {
        var variants = options[index].variants;
        var variantsCount = variants.length;
        var formFragment = document.createDocumentFragment();

        for (i = 0; i < variantsCount; i++) {
            var variant = variants[i];
            var el = createVariant(variant, index);
            formFragment.appendChild(el);
        }

        var option = document.getElementById('option');
        option.innerHTML = '';
        option.appendChild(formFragment);

        var step = document.getElementById('step');
        step.textContent = index + 1;
    }

    function displayConfig() {
        var el = document.createElement('textarea');
        el.classList.add('options-result');
        el.setAttribute('readonly', true);
        el.textContent = JSON.stringify(config, null, 4);

        var option = document.getElementById('option');
        option.innerHTML = '';
        option.appendChild(el);

        var title = document.getElementById('title');
        title.textContent = 'Copy your config from here:';
    }

    function createVariant(variant, i) {
        var el = document.createElement('div');
        el.classList.add('option-variant');
        el.dataset.index = i;
        el.dataset.value = variant.value;

        var hint = document.createElement('div');
        hint.classList.add('option-variant-hint');
        hint.textContent = variant.hint;
        el.appendChild(hint);

        var code = document.createElement('pre');
        code.classList.add('option-variant-code');
        code.innerHTML = '<code>' + variant.code + '</code>';
        el.appendChild(code);

        el.addEventListener('click', handleClick);

        return el;
    }

    var config = {};
    displayOption(0);
})()
