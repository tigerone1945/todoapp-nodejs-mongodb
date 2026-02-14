const tasksDOM = document.querySelector('.tasks');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

const showTasks = async () => {
  try {
    const { data: { tasks } } = await axios.get('/api/v1/tasks');

    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">タスクがありません</h5>';
      return;
    }

    const allTasks = tasks.map((task) => {
      const { _id: taskID, name: taskName, completed } = task;

      return `      <div class="single-task">
        <h5>
          <span><i class="fa-solid fa-check-circle"></i></span>${taskName}
        </h5>
        <div class="task-links">
          <a href="#" class="edit-link" data-id="${taskID}">
            <i class="fa-solid fa-pen"></i>
          </a>
          <button class="delete-btn" data-id="${taskID}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
    });
    tasksDOM.innerHTML = allTasks.join('');
  } catch (error) {
    console.log(error);
  }
};

showTasks();

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const taskName = taskInputDOM.value;
    
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
    
    await axios.post('/api/v1/tasks', { name: taskName });
    
    // 成功メッセージを表示
    formAlertDOM.textContent = 'タスクが正常に追加されました';
    formAlertDOM.className = 'form-alert success';
    formAlertDOM.style.display = 'block';
    
    showTasks();
    formDOM.reset();
    
    // 成功メッセージを2秒後に非表示
    setTimeout(() => {
      formAlertDOM.style.display = 'none';
    }, 2000);
    
  } catch (error) {
    console.log(error);
    
    // サーバーからのエラーメッセージを取得
    let errorMessage = 'タスクの追加に失敗しました';
    
    if (error.response && error.response.data && error.response.data.msg) {
      errorMessage = error.response.data.msg;
    }
    
    formAlertDOM.textContent = errorMessage;
    formAlertDOM.className = 'form-alert error';
    formAlertDOM.style.display = 'block';
  }
});

tasksDOM.addEventListener('click', async (e) => {
  const element = e.target;
  
  // 削除ボタンがクリックされた場合
  const deleteBtn = element.closest('.delete-btn');
  if (deleteBtn) {
    try {
      const id = deleteBtn.dataset.id;
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
    return;
  }
  
  // edit task
});