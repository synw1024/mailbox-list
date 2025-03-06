export default abstract class Folder {
  readonly id: string
  private _name: string
  constructor(id: string, name: string) {
    this.id = id
    this._name = name
  }

  get name() {
    return this._name
  }

  abstract search(): void
}

export abstract class FolderList<F extends Folder> {
  folders: F[]
  constructor(folders: F[]) {
    this.folders = folders
  }

  find(id: string) {
    return this.folders.find(f => f.id === id)
  }
}

export enum EFolderListType {
  System,
  Custom,
  Tag
}