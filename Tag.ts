import Folder, { FolderList } from "./Folder"

export default class Tag extends Folder {
  color: string
  constructor(id: string, name: string, color: string) {
    super(id, name)
    this.color = color
  }

  async pullMails() {
    const mails = await fetch(`/mails?tag=${this.id}`)
  }
}

export class TagList extends FolderList<Tag> {
  constructor(folders: Tag[]) {
    super(folders)
  }
}
