(function(){
    function Clown(arg){
        this.element = [];
        var arg = arg || document;
        var argType = typeof arg;
        switch(argType){
            case 'function':
                addEvent(window, 'load', arg);
                break;
            case 'string':
                switch(arg.charAt(0)){
                    case '#':
                        this.element.push(document.getElementById(arg.substring(1)));
                        break;
                    case '.':
                        var el = document.getElementsByClassName(arg.substring(1));
                        for(var i in el){
                            this.element.push(el[i]);
                        }
                        break;
                    case '*':
                        var el = document.getElementsByTagName(arg.charAt(0));
                        for(var i in el){
                            this.element.push(el[i]);
                        }
                        break;
                    default:
                        var el = document.getElementsByTagName(arg);
                        for(var i in el){
                            this.element.push(el[i]);
                        }
                        break;
                }
                break;
            case 'object':
                this.element.push(arg);
                break;
            default:
                break;
        }
        return this;
    }
    Clown.prototype.name = function(name){
        var el = document.getElementsByName(name);
        for(var i = 0; i < el.length; i++){
            this.element.push(el[i]);
        }
        return this;
    }
    Clown.prototype.first = function(){
        if(arguments.length == 0){
            this.element = [this.element[0]];
        }
        return this;
    }
    Clown.prototype.last = function(){
        if(arguments.length == 0){
            this.element = [this.element[this.element.length-1]];
        }
        return this;
    }
    Clown.prototype.eq = function(num){
        if(!isNaN(num)){
            this.element = [this.element[num]];
            return this;
        }
    }
    Clown.prototype.hasClass = function(className){
        return !!this.element[0].className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
    Clown.prototype.addClass = function(className){
        for(var i = 0; i < this.element.length; i++){
            this.element[i].className += ' ' + className;
        }
        return this;
    }
    Clown.prototype.removeClass = function(className){
        for(var i = 0; i < this.element.length; i++){
            this.element[i].className = this.element[i].className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"), ' ');
        }
        return this;
    }

    Clown.prototype.css = function(key, val){
        if(typeof key == 'string' && arguments.length == 2){
            for(var i in this.element){
                this.element[i].style[key] = val;
            }
        }
        if(typeof key == 'string' && arguments.length == 1){
            return getStyle(this.element[0], key);
        }
        if(typeof key == 'object' && arguments.length == 1){
            for(var k in key){
                for(var i in this.element){
                    this.element[i].style[k] = key[k];
                }
            }
        }
        return this;
    }
    Clown.prototype.attr = function(key, val){
        if(arguments.length == 1){
            return this.element[0].getAttribute(key);
        }else if(arguments.length == 2){
            for(var i in this.element){
                this.element[i].setAttribute(key, val);
            }
        }
        return this;
    }
    Clown.prototype.val = function(val){
        if(arguments.length == 0){
            return this.element[0].value;
        }else if(arguments.length == 1){
            for(var i in this.element){
                this.element[i].value = val;
            }
        }
        return this;
    }
    Clown.prototype.text = function(text){
        if(arguments.length == 0){
            return this.element[0].innerText;
        }else if(arguments.length == 1){
            for(var i in this.element){
                this.element[i].innerText = text;
            }
        }
        return this;
    }
    Clown.prototype.html = function(html){
        if(arguments.length == 0){
            return this.element[0].innerHTML;
        }else if(arguments.length == 1){
            for(var i in this.element){
                this.element[i].innerHTML = html;
            }
        }
        return this;
    }
    Clown.prototype.ready = function(fn){
        return this.bind('ready', fn);
    }
    Clown.prototype.click = function(fn){
        return this.bind('click', fn);
    }
    Clown.prototype.dblclick = function(fn){
        return this.bind('dblclick', fn);
    }
    Clown.prototype.mouseover = function(fn){
        return this.bind('mouseover', fn);
    }
    Clown.prototype.mouseout = function(fn){
        return this.bind('mouseout', fn);
    }
    Clown.prototype.keyup = function(fn){
        return this.bind('keyup', fn);
    }
    Clown.prototype.keydown = function(fn){
        return this.bind('keydown', fn);
    }
    Clown.prototype.focus = function(fn){
        return this.bind('focus', fn);
    }
    Clown.prototype.blue = function(fn){
        return this.bind('blur', fn);
    }
    Clown.prototype.on = function(event, fn){
        return this.bind(event, fn);
    }
    Clown.prototype.bind = function(event, fn){
        if(typeof event == 'string' && typeof fn == 'function' && arguments.length == 2){
            var arr = event.split(' ');
            for(var t in this.element){
                for(var i in arr){
                    addEvent(this.element[t], arr[i], fn);
                }
            }
        }
        return this;
    }
    Clown.prototype.unbind = function(){
        // 暂无解决方法
        return this;
    }
    Clown.prototype.show = function(){
        for(var i in this.element){
            this.element[i].style.display = 'block';
        }
        return this;
    }
    Clown.prototype.hide = function(){
        for(var i in this.element){
            this.element[i].style.display = 'none';
        }
        return this;
    }
    Clown.prototype.hover = function(fnover, fnout){
        for(var i in this.element){
            addEvent(this.element[i], 'mouseover', fnover);
            addEvent(this.element[i], 'mouseout', fnout);
        }
        return this;
    }
    Clown.prototype.toggle = function(){
        // 暂无方法解决
        return this;
    }
    function addEvent(obj, event, fn){
        if(obj.attachEvent){
            obj.attachEvent('on'+event, function(){
                fn.call(obj);
            });
        }else{
            obj.addEventListener(event, fn, false);
        }
    }
    function removeEvent(obj, event){
        if(obj.detachEvent){
            obj.detachEvent('on'+event, fn, false);
        }else{
            obj.removeEventListener(event, fn, false);
        }
    }
    function getStyle(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj, false)[attr];
        }
    }
    $ = function(arg){
        return new Clown(arg);
    }
})();
