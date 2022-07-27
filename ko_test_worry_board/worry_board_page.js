const BASE_URL = 'http://127.0.0.1:8000';

const urlParams = new URLSearchParams(window.location.search);
const url_page_num = urlParams.get('page_num');
let url_category = urlParams.get('category');

// 쿠키 할당

function get_cookie(name) {
    let cookie_value = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookie_value = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookie_value;
}
const csrftoken = get_cookie('csrftoken')


// request모달을 열어주는 함수
function open_request_modal(id, content){
    document.getElementById('edit_modal_background').style.display="block"
    const small_modal = document.getElementById('edit_small_modal');
    document.body.style.overflow = 'hidden';
    let modal_top_now = parseInt((window.innerHeight - small_modal.clientHeight) / 2)
    let modal_left_now = parseInt((window.innerWidth - small_modal.clientWidth) / 2)
    
    small_modal.style.left = modal_left_now + "px";
    small_modal.style.top = modal_top_now + "px";

    
    const worry_board_content = document.getElementById('md_bb_bl_bd_ct_left_' + id);
    const content_box = document.querySelector('.sm_bd_target_content')
    content_box.innerHTML = worry_board_content.innerText
    const sm_bd_content = document.getElementById('sm_bd_content')
    sm_bd_content.innerHTML = `<textarea class="sm_bd_ct_textarea" id="edit_sm_bd_ct_textarea_${id}"></textarea>`
    document.getElementById('edit_sm_bd_button').innerHTML = `<button class="sm_bd_submit_button" onclick="request_message(${id})">작성</button>`
}
//  request 모달의 외부를 클릭 시
edit_modal_background.addEventListener('click', function (e) {
if (e.target.classList.contains('modal_background')) {
    close_modal()
}
})



// 고민글 작성 모달을 열어주는 함수
function open_modal(){
    document.getElementById('modal_background').style.display="block"
    document.body.style.overflow = 'hidden';
    const small_modal = document.getElementById('small_modal');
    let modal_top_now = parseInt((window.innerHeight - small_modal.clientHeight) / 2)
    let modal_left_now = parseInt((window.innerWidth - small_modal.clientWidth) / 2)
    
    small_modal.style.left = modal_left_now + "px";
    small_modal.style.top = modal_top_now + "px";
}
// 게시글 작성모달의 외부를 클릭 시
modal_background.addEventListener('click', function (e)  {
    if (e.target.classList.contains('modal_background')) {
        close_modal()
}
})

function close_modal(){
    document.querySelector('.modal_background').style.display="none"
    document.getElementById('edit_modal_background').style.display="none"
    document.body.style.overflow = 'auto';
}
// 모달을 통해서 간단 고민글 작성하는 로직
async function post_board(){
    const boards_category = document.querySelector(".sm_tt_category").value;
    const boards_content = document.querySelector(".sm_bd_ct_textarea").value;
    const token = localStorage.getItem('access')
    const result = await fetch(BASE_URL + '/worry_board/' ,{
        method: 'POST',
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "category": parseInt(boards_category),
            "content" : boards_content
        })
    })
    let res = await result.json()
    if (result.status == 200) {
        alert("게시글을 작성 하였습니다!!")
        click_category(0)
    }
    else {
        alert("게시글 작성에 실패하였습니다.")
    }
}

// 요청 모달을 통해서 게시물에 대한 요청을 작성하는 로직
async function request_message(worry_board_id){
    const request_message_text = document.getElementById('edit_sm_bd_ct_textarea_' + worry_board_id).value;
    const token = localStorage.getItem('access')
    const result = await fetch(BASE_URL + '/worry_board/' + worry_board_id + '/request' ,{
        method: 'POST',
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "request_message": request_message_text
        })
    })
    let res = await result.json()
    if (result.status == 200) {
        alert(res['message'])
        click_category(0)
    }
    else {
        alert(res['message'])
    }
}



// 현재 내가 보고있는 보드의 디테일페이지로 이동하는 로직
function href_board_detail(url_board_id){
    location.href = '../../ko_test_worry_board/worry_board_page.html?board_id=' + url_board_id
}

// 3줄 간단 고민글을 가져오는 로직
window.onload = get_board

async function get_board() {
    const urlParams = new URLSearchParams(window.location.search);
    let url_page_num = urlParams.get('page_num');
    let url_category = urlParams.get('category');

    if (!url_page_num){
        url_page_num = 1
    }
    if (!url_category){
        url_category = 0
    }

    const result = await fetch(BASE_URL + '/worry_board/?category=' + url_category + "&page_num=" + url_page_num , {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
    })
    let res = await result.json()
    if (result.status == 200) {
        pagenation(res.total_count, 10, 10, url_page_num)
        let tmp_board = ``
        for (let i = 0; i < res.boards.length; i++){
            board = res.boards[i]
            board.category_list = ['모두보기', '일상', "가족", "연애", "인간 관계", "학업", "육아"]
            category_name = board.category_list[board.category]
            if(board.is_worry_board_writer == true){
                tmp_board += `
                <div class="md_bb_bl_board" id="md_bb_bl_board_1">
                <div class="md_bb_bl_board_box">
                    <div class="md_bb_bl_bd_description">
                        <div class="md_bb_bl_bd_desc_image_icon"></div>
                        <div class="md_bb_bl_bd_middle">
                            <div class="md_bb_bl_bd_hidden_name">${category_name}</div>
                            <div class="md_bb_bl_bd_desc_create_date">${board.create_date}</div>
                        </div>                         
                    </div>
                    <div class="md_bb_bl_bd_content">
                        <p class="md_bb_bl_bd_ct_left" id="md_bb_bl_bd_ct_left_${board.id}">
                            ${board.content}
                        </p>
                        <div class="md_bb_bl_bd_ct_right">
                            <div class="md_bb_bl_bd_ct_rg_border"></div>
                        </div>
                    </div>
                </div>
                <div class="md_bb_bl_bd_request">
                <button class="md_bb_bl_bd_request_button" id="md_bb_bl_bd_request_button_${board.id}" onclick="open_request_modal('${board.id}', '${board.content}')">요청</button>
                </div>
            </div>`
            }
            else{
                tmp_board += `
                <div class="md_bb_bl_board" id="md_bb_bl_board_1">
                <div class="md_bb_bl_board_box">
                    <div class="md_bb_bl_bd_description">
                        <div class="md_bb_bl_bd_desc_image_icon"></div>
                        <div class="md_bb_bl_bd_middle">
                            <div class="md_bb_bl_bd_hidden_name">${category_name}</div>
                            <div class="md_bb_bl_bd_desc_create_date">${board.create_date}</div>
                        </div>
                    </div>
                    <div class="md_bb_bl_bd_content">
                        <p class="md_bb_bl_bd_ct_left" id="md_bb_bl_bd_ct_left_${board.id}">
                            ${board.content}
                        </p>
                        <div class="md_bb_bl_bd_ct_right">
                            <div class="md_bb_bl_bd_ct_rg_border"></div>
                        </div>
                    </div>
                </div>
                <div class="md_bb_bl_bd_request">
                <button class="md_bb_bl_bd_request_button" id="md_bb_bl_bd_request_button_${board.id}" onclick="open_request_modal('${board.id}', '${board.content}')">요청</button>
                </div>
            </div>`
            }


            const board_lists = document.querySelector(".mc_bb_board_lists")
            board_lists.innerHTML = tmp_board
        }
    }
    else {
        alert("세션이 만료 되었습니다.")
        go_sign_in()
    }
}

// 페이지네이션에 관련된 함수 (window.onload시 로드함)
function pagenation(total_count, bottomSize, listSize, page_num ){
    // (백엔드에서 보내주는 전체 데이터 수, 하단에 생성한 숫자의 최대 수, 한 화면에 보여줄 포스트의 수, 현재 페이지)
    let totalPageSize = Math.ceil(total_count / listSize)  //하단 버튼의 수

    let firstBottomNumber = page_num - page_num % bottomSize + 1;  //지금 화면에서 보여지는 하단 최초 시작 숫자
    let lastBottomNumber = page_num - page_num % bottomSize + bottomSize;  //지금 화면에서 보여지는 하단 마지막 숫자
    if(lastBottomNumber > totalPageSize) lastBottomNumber = totalPageSize  //총 갯수보다 큰 경우 방지

    const mc_bb_page_number = document.querySelector('.mc_bb_page_number')
    for(let i = firstBottomNumber ; i <= lastBottomNumber; i++){
        if(i==page_num){
            mc_bb_page_number.innerHTML += (`<span class="page_number cur_page" id="page_num_${i}" onclick="click_page_num(${i})">${i} </span>`)
        }
        else {
            mc_bb_page_number.innerHTML += `<span class="page_number" id="page_num_${i}" onclick="click_page_num('${i}')">${i} </span>`
        }
    }
}
function click_category(category){
    location.href = '../../ko_test_worry_board/worry_board_page.html?category=' +  category + "&page_num=" + 1
}
function click_page_num(page_num){
    if(!url_category){
        url_category=1
    }
    location.href = '../../ko_test_worry_board/worry_board_page.html?category=' +  url_category + "&page_num=" + page_num
}
function go_sign_in(){
    location.href = '../../won_test/signin.html'
}

