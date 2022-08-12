// 목표: graphic의 opacity가 기본적으로 0인 상태인데 visible 클래스가 붙은 것만 opacity가 1이 돼서 눈에 보여야 한다.
// 목표: 스크롤을 하면 visible 클래스가 왔다갔다 함.
// 방법: 스크립트로 스크롤 구간에 따라서 그래픽 아이템들의 visible class를 붙였다 뗐다가 해주면 된다.
// 이미지는 말풍선 내용과 쌍이 맞아야 한다. → 이미지와 말풍선에 각각 index 숫자를 붙여준다. (data-index)
// 말풍선의 위치를 기준으로 이미지를 바꿔준다. 
// data- 으로 시작하는 속성은 html 표준이다. data- 뒤에는 이름이다. 아무거나 써도 된다. data- 형식만 맞춰주면 된다.

(() => {

    const stepElems = document.querySelectorAll('.step'); // 말풍선
    const graphicElems = document.querySelectorAll('.graphic-item'); // 그림
    // let currentItem; // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
    let currentItem = graphicElems[0]; // 첫번째 그림에 visible을 붙이면서 시작하도록 한다. 
    let ioIndex; // 인덱스를 활용하기 위해서 인덱스 변수를 하나 만든다. 

    // 현재 step에 해당하는 인덱스에 전꺼랑 다음꺼 3개만 체크하도록 한다. 
    // IntersectionObserver을 이용하면 현재 어떤 게 보이는지 몇 번째 인덱스에 해당하는 step이 보이는지를 잡아낼 수 있다.

    const io = new IntersectionObserver((entries, observer) => {
        // console.log(entries); // IntersectionObserver 객체가 .observe로 관찰하는 대상이 되는 객체들이 나타나거나 사라질 때 그 시점마다 callback 함수가 실행된다.
        // console.log(entries[0].target.dataset.index); // 해당되는 step의 dataset으로 인덱스를 접근해서 콘솔창에 출력해본다.  
        // 현재 체크된 인덱스 기준으로 바로 전꺼 바로 다음꺼 위치만 체크해본다. 
        // * 1의 의미: 문자열을 숫자로 바꾸는 제일 쉬운 방법. 콘솔창에서 텍스트가 검은색으로 찍히면 문자열. 숫자면 파란색.
        // 인덱스는 숫자로 쓰이는 게 편하므로 문자열을 숫자로 바꿔준다.
        ioIndex = entries[0].target.dataset.index * 1;
    });


    // 말풍선, 그림 클래스에 data-index="i" 를 넣는 for문 작성
    // 그런데 이 for문의 단점은 너무 모든 것에 대해 루프를 돈다는 것. 루프가 필요한 건 3개다. 현재 step에 해당하는 인덱스랑 전꺼랑 다음꺼.
    // 그래서 위에서 IntersectionObserver 함수를 쓴다. 
    for (let i = 0; i < stepElems.length; i++){
        // .observe를 쓰면 모든 stepElems가 관찰 대상이 된다. 
        io.observe(stepElems[i]);
        // stepElems[i].setAttribute('data-index', i); // 이렇게 써도 된다.
        // 데이터 객체가 미리 만들어진 dataset을 이용할 수도 있다. dataset의 속성 이름을 index로 접근한다.
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    // 이벤트핸들러함수는 구체적인 기능이 많이, 자세하게 기술되어 있으면 좋지 않음.
    // 이벤드핸들러함수는 조건 판별만 해주고, 각각의 세세한 기능들을 각각 다른 함수로 쪼개주는 게 좋음.
    // 기능을 따로 빼주니까 호출을 할 수 있게 됨.
    function activate() {
        currentItem.classList.add('visible');
    }

    function inactivate() {
        currentItem.classList.remove('visible'); // currentItem이 있으면 삭제.
    }

    // 스크롤 이벤트
    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        let temp = 0; // 변수를 하나 만들어서 루프가 돌 때마다 1씩 플러스되도록 한다. 

        for (let i = 0; i < stepElems.length; i++){
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();
            // console.log(boundingRect.top); //이렇게 하면 현재 아이템(각 step)의 top의 위치가 콘솔에 나온다. 

            temp++; // 변수를 하나 만들어서 루프가 돌 때마다 1씩 플러스되도록 한다. 
            
            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                // console.log(step.dataset.index); //스크롤을 내릴 때 말풍선 순서대로 0, 1, 2가 콘솔에 찍히면 제대로 된 것.
                // graphicElems[step.dataset.index] //visible 클래스를 붙일 그래픽 아이템 
                // visible을 없애기 위해서는 지금 활성화된 것을 어떤 변수에 담아놓고 
                // 그 변수에 들어있는 애를 visible 클래스를 제거해준 다음에 지금 활성화시킬 애를 다시 visible add하면 된다.  
                // currentItem.classList.remove('visible'); // 이렇게 보다 밑에처럼 기능을 따로 빼서 호출을 해주는 게 더 깔끔.
                inactivate();
                // 그냥 currentItem.classList.remove('visible'); 이라고 하면 변수에 아무 값도 저장하지 않은 상태이므로 에러남.
                currentItem = graphicElems[step.dataset.index];
                // currentItem.classList.add('visible');; // 이렇게 보다 밑에처럼 기능을 따로 빼서 호출을 해주는 게 더 깔끔.
                activate();
            }
        
        }
    });

    // currentItem.classList.add('visible'); //첫번째 아이템에 visible을 활성화시키는 코드. 그런데 코드가 반복되므로 비추인 코드.
    // 이벤트핸들러함수는 구체적인 기능이 많이, 자세하게 기술되어 있으면 좋지 않음.
    // 이벤드핸들러함수는 조건 판별만 해주고, 각각의 세세한 기능들을 각각 다른 함수로 쪼개주는 게 좋음.


})();