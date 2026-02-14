const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const formAlertDOM = document.querySelector('.form-alert');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

console.log(id);

const showTask = async () => {
  try {
    const { data: { task } } = await axios.get(`/api/v1/tasks/${id}`);
    const { name, completed, _id } = task;
    taskIDDOM.textContent = _id;
    taskNameDOM.value = name;
    taskCompletedDOM.checked = completed;
  } catch (error) {
    console.log(error);
  }
};

showTask();

editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const taskName = taskNameDOM.value;
    taskCompleted = taskCompletedDOM.checked;
    
    // クライアント側バリデーション
    if (taskName.trim() === '') {
      formAlertDOM.textContent = 'タスク名を入力してください';
      formAlertDOM.className = 'form-alert error';
      formAlertDOM.style.display = 'block';
      return;
    }
    
    if (taskName.length > 20) {
      formAlertDOM.textContent = 'タスク名は20文字以下で入力してください';
      formAlertDOM.className = 'form-alert error';
      formAlertDOM.style.display = 'block';
      return;
    }
    
    // エラー表示をクリア
    formAlertDOM.style.display = 'none';
    
    const { data: { task } } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted
    });
    
    // 成功メッセージを表示
    formAlertDOM.textContent = 'タスクが正常に更新されました';
    formAlertDOM.className = 'form-alert success';
    formAlertDOM.style.display = 'block';
    
    // 2秒後にタスク一覧に戻る
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    
  } catch (error) {
    console.log(error);
    
    // サーバーからのエラーメッセージを取得
    let errorMessage = 'タスクの更新に失敗しました';
    
    if (error.response && error.response.data && error.response.data.msg) {
      errorMessage = error.response.data.msg;
    }
    
    formAlertDOM.textContent = errorMessage;
    formAlertDOM.className = 'form-alert error';
    formAlertDOM.style.display = 'block';
  }  
});