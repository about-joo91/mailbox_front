const BASE_URL = 'http://127.0.0.1:8000';

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

function open_request_modal(worry_board_content){
    console.log(worry_board_content)
    document.getElementById('modal_background').style.display="block"
    const small_modal = document.getElementById('small_modal');
    document.body.style.overflow = 'hidden';
    let modal_top_now = parseInt((window.innerHeight - small_modal.clientHeight) / 2)
    let modal_left_now = parseInt((window.innerWidth - small_modal.clientWidth) / 2)
    
    small_modal.style.left = modal_left_now + "px";
    small_modal.style.top = modal_top_now + "px";

    const modal_text = document.querySelector(".sm_bd_ct_text")
    modal_text.innerText = worry_board_content
}
//  모달의 외부를 클릭 시
modal_background.addEventListener('click', function (e) {
if (e.target.classList.contains('modal_background')) {
    close_modal()
}
})
// worry_board의 모달을 닫는 함수
function close_modal(){
    document.querySelector('.modal_background').style.display="none"
    document.getElementById('edit_modal_background').style.display="none"
    document.body.style.overflow = 'auto';
}


window.onload = get_request_messages

async function get_request_messages() {
    const result = await fetch(BASE_URL + '/worry_board/request/sended' , {
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
        // pagenation(res.total_count, 10, 10, url_page_num)
        let tmp_request_message = ``
        for (let i = 0; i < res.request_message.length; i++){
            console.log(res.request_message[i])
            request_message = res.request_message[i]
            console.log(request_message.worry_board_content)
            tmp_request_message += `
            <div class="md_bb_bl_board" id="md_bb_bl_board">
                <div class="md_bb_bl_board_box">
                    <div class="md_bb_bl_bd_description">
                        <!-- <div class="md_bb_bl_bd_desc_image_icon"></div> -->
                        <div class="md_bb_bl_bd_middle">
                            <div class="md_bb_bl_bd_hidden_name">${request_message.worry_board_category}</div>
                            <div class="md_bb_bl_bd_desc_create_date">${request_message.create_date}</div>
                        </div>    
                        <div class="md_bb_bl_bd_desc_edit_delete">
                            <div class="md_bb_bl_bd_desc_ed_edit" id="md_bb_bl_bd_desc_ed_edit" onclick="open_edit_modal('${request_message.request_message}','${request_message.id}')">수정</div>
                            <div class="md_bb_bl_bd_desc_ed_delete" id="md_bb_bl_bd_desc_ed_delete" onclick="delete_request_message(${request_message.id})">삭제</div>
                        </div>                           
                    </div>
                    <div class="md_bb_bl_bd_content">
                        <p class="md_bb_bl_bd_ct_left" id="md_bb_bl_bd_ct_left">
                            ${request_message.request_message}
                        </p>
                        <div class="md_bb_bl_bd_ct_right">
                            <div class="md_bb_bl_bd_ct_rg_border"></div>
                        </div>
                    </div>
                </div>
                <div class="md_bb_bl_bd_request">
                <button class="md_bb_bl_bd_request_button" id="md_bb_bl_bd_request_button_${request_message.id}" onclick="open_request_modal('${request_message.worry_board_content}')">고민 글</button>
                </div>
            </div>`

            const board_lists = document.querySelector(".mc_bb_board_lists")
            board_lists.innerHTML = tmp_request_message
        }
    }
    else {
        alert("세션이 만료 되었습니다.")
        go_sign_in()
    }
}

function open_edit_modal(content,request_message_id){
    document.getElementById('edit_modal_background').style.display="block"
    const small_modal = document.getElementById('edit_small_modal');
    document.body.style.overflow = 'hidden';
    let modal_top_now = parseInt((window.innerHeight - small_modal.clientHeight) / 2)
    let modal_left_now = parseInt((window.innerWidth - small_modal.clientWidth) / 2)
    
    small_modal.style.left = modal_left_now + "px";
    small_modal.style.top = modal_top_now + "px";
    document.getElementById('edit_sm_bd_ct_textarea').innerText =  content
    document.getElementById('edit_sm_bd_button').innerHTML = `<button class="sm_bd_submit_button" onclick="edit_request_message(${request_message_id})">수정</button>`
}

// 게시글 수정모달의 외부를 클릭 시
edit_modal_background.addEventListener('click', function (e) {
if (e.target.classList.contains('modal_background')) {
    close_modal()
}
})
    

// 모달을 통해서 request_message를 수정하는 로직
async function edit_request_message(request_message_id){
    const token = localStorage.getItem('access')
    const edit_message = document.getElementById('edit_sm_bd_ct_textarea').value;
    const result = await fetch(BASE_URL + '/worry_board/request/pd/' + request_message_id , {
        method: 'PUT',
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "request_message" : edit_message
        })
    })
    let res = await result.json()
    if (result.status == 200) {
        alert(res['message'])
        location.reload()
    }
    else{
        alert(res['message'])
    }
}

// 글을 삭제하는 로직 (cruD)
async function delete_request_message(request_message_id){
    const token = localStorage.getItem('access')
    const result = await fetch(BASE_URL + '/worry_board/request/pd/' + request_message_id , {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': `Bearer ${token}`
        },
    })
    let res = await result.json()
    if (result.status == 200) {
        alert(res['message'])
        location.href = 'send_request_messages.html'
    }
    else{
        alert(res['message'])
    }
}
