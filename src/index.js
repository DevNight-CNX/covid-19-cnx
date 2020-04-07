import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/th';
import { notification, Button } from 'antd';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'url-polyfill';

moment.locale('th');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: serviceWorkerRegistration => {
    const key = 'version-update';

    notification.open({
      message: `มีเวอร์ชั่นอัพเดทใหม่`,
      description:
        'เวอร์ชั่นจะอัพเดทใหม่อัตโนมัติเมื่อปิดเว็บไซต์หรือกดปุ่ม "อัพเดท" ด้านล่าง',
      btn: (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            notification.close(key);
            if (serviceWorkerRegistration.waiting) {
              serviceWorkerRegistration.waiting.postMessage({
                type: 'SKIP_WAITING'
              });
              serviceWorkerRegistration.waiting.addEventListener(
                'statechange',
                event => {
                  if (event.target.state === 'activated') {
                    window.location.reload();
                  }
                }
              );
            }
          }}
        >
          อัพเดท
        </Button>
      ),
      key
    });
  }
});
