import Folder, { FolderList } from "./Folder"

export default class Tag extends Folder {
  color: string
  constructor(id: string, name: string, color: string) {
    super(id, name)
    this.color = color
  }
}

export class TagList extends FolderList<Tag> {
  constructor(folders: Tag[]) {
    super(folders)
  }
}
