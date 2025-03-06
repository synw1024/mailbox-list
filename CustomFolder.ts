import Folder, { FolderList } from "./Folder";

export default class CustomFolder extends Folder {
  children: CustomFolder[]
  constructor(id: string, name: string, children: CustomFolder[]) {
    super(id, name)
    this.children = children
  }

  async pullMails() {
    const mails = await fetch(`/mails?folder=${this.id}`)
  }
}

export class CustomFolderList extends FolderList<CustomFolder> {
  constructor(folders: CustomFolder[]) {
    super(folders)
  }

  find(id: string) {
    let folder: CustomFolder | undefined
    function dfs(folders: CustomFolder[]) {
      return folders.some(f => {
        if (f.id === id) {
          folder = f
          return true
        }
        return f.children.length > 0 && dfs(f.children)
      })
    }
    dfs(this.folders)

    return folder
  }
}