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

    // 말풍선, 그림 클래스에 data-index="i" 를 넣는 for문 작성
    for (let i = 0; i < stepElems.length; i++){
        // stepElems[i].setAttribute('data-index', i); // 이렇게 써도 된다.
        // 데이터 객체가 미리 만들어진 dataset을 이용할 수도 있다. dataset의 속성 이름을 index로 접근한다.
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }
    // 스크롤 이벤트
    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        for (let i = 0; i < stepElems.length; i++){
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();
            // console.log(boundingRect.top); //이렇게 하면 현재 아이템(각 step)의 top의 위치가 콘솔에 나온다. 
            
            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                // console.log(step.dataset.index); //스크롤을 내릴 때 말풍선 순서대로 0, 1, 2가 콘솔에 찍히면 제대로 된 것.
                // graphicElems[step.dataset.index] //visible 클래스를 붙일 그래픽 아이템 
                // visible을 없애기 위해서는 지금 활성화된 것을 어떤 변수에 담아놓고 
                // 그 변수에 들어있는 애를 visible 클래스를 제거해준 다음에 지금 활성화시킬 애를 다시 visible add하면 된다.  
                if (currentItem) {
                    currentItem.classList.remove('visible'); // currentItem이 있으면 삭제.
                }
                // 그냥 currentItem.classList.remove('visible'); 이라고 하면 변수에 아무 값도 저장하지 않은 상태이므로 에러남.
                currentItem = graphicElems[step.dataset.index];
                currentItem.classList.add('visible');
            }
        
        }
    });

    currentItem.classList.add('visible'); //첫번째 아이템에 visible을 활성화시키는 코드. 그런데 코드가 반복되므로 비추인 코드.



})();