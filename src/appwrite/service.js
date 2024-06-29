import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //create a post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.client.createDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error ", error);
    }
  }

  //update a post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error ", error);
    }
  }

  //delete a post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        slug
      );

      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error ", error);

      return false;
    }
  }

  //get a post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error ", error);

      return false;
    }
  }

  //get all posts
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getAllPosts :: error ", error);

      return false;
    }
  }

  //upload file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFiles :: error ", error);

      return false;
    }
  }

  //delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appWriteBucketId, fileId);

      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFiles :: error ", error);

      return false;
    }
  }

  //file preview
  async previewFile(fileId) {
    try {
      return await this.storage.getFilePreview(
        config.appWriteBucketId, 
        fileId);

    } catch (error) {
      console.log("Appwrite service :: previewFile :: error ", error);

      return false;
    }
  }
}

const service = new Service();

export default service;
