# deepCollapse

use

        var wrapNodes = document.getElementById('collapse');
        var boxNodes = wrapNodes.getElementsByClassName('singlebox');
        var headNodes = wrapNodes.getElementsByTagName('h4');
        var contNodes = wrapNodes.getElementsByClassName('singlecont'); 
        
        deepCollapse({
            wrapNodes : wrapNodes, // *必须项 折叠菜单整体
            boxNodes : boxNodes, // *必须项 单一内容(包含tit 和 cont)
            headNodes : headNodes, // *必须项 标题tit
            contNodes :contNodes, // *必须项 内容cont
            animate : 'easeOutQuad' // 动画效果，参照deepEasse.js 30+ ease效果
        }); 