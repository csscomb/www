(function() {
    var options = [{
        id: 'remove-empty-rulesets',
        variants: [{
            hint: 'Remove empty rulesets',
            code: '.a {\n    color: tomato;\n}\n<mark> </mark>',
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
            code: '.a {\n    color: tomato<mark>;</mark>\n}',
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
            code: '.a {\n    color: <mark>#fff</mark>;\n    background-color: <mark>#aaa</mark>;\n}',
            value: 'lower'
        }, {
            hint: 'Set colors to uppercase',
            code: '.a {\n    color: <mark>#FFF</mark>;\n    background-color: <mark>#AAA</mark>;\n}',
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
            code: '.a {\n<mark>\t</mark>color: tomato;\n<mark>\t</mark>.b {\n<mark>\t\t</mark>color: salmon;\n<mark>\t</mark>}\n}',
            value: '\t'
        }, {
            hint: 'Set block indent to 2 spaces',
            code: '.a {\n<mark>  </mark>color: tomato;\n<mark>  </mark>.b {\n<mark>    </mark>color: salmon;\n<mark>  </mark>}\n}',
            value: "  "
        }, {
            hint: 'Set block indent to 4 spaces',
            code: '.a {\n<mark>   </mark>color: tomato;\n<mark>    </mark>.b {\n<mark>        </mark>color: salmon;\n<mark>    </mark>}\n}',
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
            code: '.a {\n    color: <mark>#ffcc00</mark>;\n    background: <mark>#cccccc</mark>;\n}',
            value: false
        }, {
            hint: 'Use shorthands for hexadecimal colors',
            code: '.a {\n    color: <mark>#fc0</mark>;\n    background: <mark>#ccc</mark>;\n}',
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
            code: '<mark>li</mark> > <mark>a</mark> {\n    color: tomato;\n}',
            value: 'lower'
        }, {
            hint: 'Set selectors to uppercase',
            code: '<mark>LI</mark> > <mark>A</mark> {\n    color: tomato;\n}',
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
            code: '.a {\n    color: tomato;\n}\n<mark> </mark>',
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
            code: '.a {\n    padding: <mark>0.1vh</mark>;\n    font-size: <mark>0.5em</mark>;\n}',
            value: true
        }, {
            hint: 'Remove leading zero',
            code: '.a {\n    padding: <mark>.1vh</mark>;\n    font-size: <mark>.5em</mark>;\n}',
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
            code: 'p[href^=<mark>\'</mark>https://<mark>\'</mark>]:before {\n    content: <mark>\'</mark>secure<mark>\'</mark>\n}',
            value: 'single'
        }, {
            hint: 'Use double quotes',
            code: 'p[href^=<mark>"</mark>https://<mark>"</mark>]:before {\n    content: <mark>"</mark>secure<mark>"</mark>\n}',
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
            code: '.a {\n    <mark>a</mark>lign-items: center;\n    <mark>b</mark>ackground: tomato;\n    <mark>c</mark>olor: salmon;\n}',
            value: 'abc'
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    background: tomato;\n    align-items: center;\n    color: salmon;\n}',
            value: null
        }]
    }, {
        id: 'space-before-colon',
        variants: [{
            hint: 'Add a space before colon',
            code: '.a {\n    color<mark> :</mark>tomato;\n    top<mark> :</mark>0;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces before colon',
            code: '.a {\n    color<mark>:</mark>tomato;\n    top<mark>:</mark>0;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color:tomato;\n    top :0;\n}',
            value: null
        }]
    }, {
        id: 'space-after-colon',
        variants: [{
            hint: 'Add a space after colon',
            code: '.a {\n    color<mark>: </mark>tomato;\n    top<mark>: </mark>0;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces after colon',
            code: '.a {\n    color<mark>:</mark>tomato;\n    top<mark>:</mark>0;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color:tomato;\n    top: 0;\n}',
            value: null
        }]
    }, {
        id: 'space-before-combinator',
        variants: [{
            hint: 'Add a space before combinator',
            code: '.a<mark> ></mark>span {\n    color: tomato;\n}\n.b<mark> ></mark> span {\n    color: salmon;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces before combinator',
            code: '.a<mark>></mark> span {\n    color: tomato;\n}\n.b<mark>></mark> span {\n    color: salmon;\n}',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a> span {\n    color: tomato;\n}\n.b > span {\n    color: salmon;\n}',
            value: null
        }]
    }, {
        id: 'space-after-combinator',
        variants: [{
            hint: 'Add a space after combinator',
            code: '.a <mark>> </mark>span {\n    color: tomato;\n}\n.b <mark>> </mark>span {\n    color: salmon;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces after combinator',
            code: '.a <mark>></mark>span {\n    color: tomato;\n}\n.b <mark>></mark>span {\n    color: salmon;\n}',
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
            code: '.a {\n    color: tomato<mark>;\n    </mark>top: 0<mark>;\n    </mark>height: 0;\n}',
            value: '\n'
        }, {
            hint: 'Add a space between declarations',
            code: '.a {\n    color: tomato<mark>; </mark>top: 0<mark>; </mark>height: 0;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces between declarations',
            code: '.a {\n    color: tomato<mark>;</mark>top: 0<mark>;</mark>height: 0;\n}',
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
            code: '.a<mark> \n{</mark>\n    color: tomato;\n}',
            value: '\n'
        }, {
            hint: 'Add a space before opening brace',
            code: '.a<mark> {</mark>\n    color: tomato;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces before opening brace',
            code: '.a<mark>{</mark>\n    color: tomato;\n}',
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
            code: '.a <mark>{\n    </mark>color: tomato;\n}',
            value: '\n'
        }, {
            hint: 'Add a space after opening brace',
            code: '.a <mark>{ </mark>color: tomato;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces after opening brace',
            code: '.a <mark>{</mark>color: tomato;\n}',
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
            code: '.a<mark>,\n&#8202;</mark>.b {\n    color: tomato;\n}',
            value: '\n'
        }, {
            hint: 'Add a space after selector delimiter',
            code: '.a<mark>, </mark>.b {\n    color: tomato;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces after selector delimiter',
            code: '.a<mark>,</mark>.b {\n    color: tomato;\n}',
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
            code: '.a<mark> ,</mark> .b {\n    color: tomato;\n}',
            value: ' '
        }, {
            hint: 'Remove spaces before selector delimiter',
            code: '.a<mark>,</mark> .b {\n    color: tomato;\n}',
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
            code: '.a {\n    color: tomato;<mark>&#8202;\n}</mark>',
            value: '\n'
        }, {
            hint: 'Add a space before closing brace',
            code: '.a {\n    color: tomato;<mark> }</mark>',
            value: ' '
        }, {
            hint: 'Remove spaces before closing brace',
            code: '.a {\n    color: tomato;<mark>}</mark>',
            value: ''
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato\n}',
            value: null
        }]
    }, {
        id: 'strip-spaces',
        variants: [{
            hint: 'Trim trailing spaces',
            code: '.a {\n    color: tomato;\n}<mark></mark>',
            value: true
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    color: tomato\n}\n\n\n',
            value: null
        }]
    }, {
        id: 'tab-size',
        variants: [{
            hint: 'Replace hard tabs with 4 spaces',
            code: '.a {\n<mark>    </mark>color: tomato;\n<mark>    </mark>height: 0;\n}',
            value: true
        }, {
            hint: 'Replace hard tabs with 2 spaces',
            code: '.a {\n<mark>  </mark>color: tomato;\n<mark>  </mark>height: 0;\n}',
            value: true
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n\tcolor: tomato;\n\theight: 0;\n}',
            value: null
        }]
     }, {
        id: 'unitless-zero',
        variants: [{
            hint: 'Remove units in zero-valued dimensions',
            code: '.a {\n    border: 0<mark> </mark>;\n}',
            value: true
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    border: 0px;\n}',
            value: null
        }]
     }, {
        id: 'vendor-prefix-align',
        variants: [{
            hint: 'Align prefixes',
            code: '.a {\n    <mark>-webkit-</mark>border-radius: 3px;\n    <mark>   -moz-</mark>border-radius: 3px;\n    <mark>        </mark>border-radius: 3px;\n}',
            value: true
        }, {
            hint: 'Leave code untouched',
            code: '.a {\n    -webkit-border-radius: 3px;\n    -moz-border-radius: 3px;\n    border-radius: 3px;\n}',
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
        el.style.height = el.scrollHeight - 10 + 'px';

        var title = document.getElementById('title');
        title.innerHTML = 'Copy the config from here &darr; and save it as <code>.csscomb.json</code> in your project\'s dir:';

        document.getElementById('progress').innerHTML = '';
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
