import Folder, { FolderList } from './Folder'

export default class SystemFolder extends Folder {
  constructor(id: string, name: string) {
    super(id, name)
  }
}

export class SystemFolderList extends FolderList<SystemFolder> {
  constructor(folders: SystemFolder[]) {
    super(folders)
  }
}