import { Notification } from 'electron'

export function inform(msg: string) {
  const notification = new Notification({
    body: msg,
    silent: true,
    timeoutType: 'default',
  })
  notification.show()
}