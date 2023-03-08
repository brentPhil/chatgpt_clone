interface Message {
  text: string
  createdAt: admin.getFirestore.Timestamp
  user: {
    _id: string
    name: string
    avatar: string
  }
}
