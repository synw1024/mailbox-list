import Folder, { FolderList } from './Folder'

export default class SystemFolder extends Folder {
  constructor(id: string, name: string) {
    super(id, name)
  }

  async pullMails() {
    const mails = await fetch(`/mails?mbox=${this.id}`)
  }
}

export class SystemFolderList extends FolderList<SystemFolder> {
  constructor(folders: SystemFolder[]) {
    super(folders)
  }
}