const CommentPost = {"body":{"type":"object","properties":{"content":{"type":"string","description":"Comment content"}},"$schema":"http://json-schema.org/draft-04/schema#"},"metadata":{"allOf":[{"type":"object","properties":{"id":{"type":"integer","$schema":"http://json-schema.org/draft-04/schema#","description":"ID of the post"}},"required":["id"]}]},"response":{"201":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const CreatePost = {"body":{"type":"object","properties":{"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"}},"$schema":"http://json-schema.org/draft-04/schema#"},"response":{"201":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const DeletePost = {"metadata":{"allOf":[{"type":"object","properties":{"id":{"type":"integer","$schema":"http://json-schema.org/draft-04/schema#","description":"ID of the post"}},"required":["id"]}]}} as const
;
const DeleteUsersIdFollow = {"metadata":{"allOf":[{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the user to unfollow","$schema":"http://json-schema.org/draft-04/schema#"}},"required":["id"]}]},"response":{"200":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"},"posts":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}},"followed":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"followers":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const GetAllPosts = {"response":{"200":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const GetAuthLogout = {"response":{"200":{"type":"object","properties":{"status":{"type":"string","examples":["success"]}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const GetFollowedPosts = {"response":{"200":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const GetPost = {"metadata":{"allOf":[{"type":"object","properties":{"id":{"type":"integer","$schema":"http://json-schema.org/draft-04/schema#","description":"ID of the post"}},"required":["id"]}]},"response":{"200":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const GetUsers = {"response":{"200":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const GetUsersId = {"metadata":{"allOf":[{"type":"object","properties":{"id":{"type":"integer","$schema":"http://json-schema.org/draft-04/schema#","description":"ID of the user"}},"required":["id"]}]},"response":{"200":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"},"posts":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}},"followed":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"followers":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const GetUsersMe = {"response":{"200":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"},"posts":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}},"followed":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"followers":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const LikePost = {"metadata":{"allOf":[{"type":"object","properties":{"id":{"type":"integer","$schema":"http://json-schema.org/draft-04/schema#","description":"ID of the post"}},"required":["id"]}]},"response":{"200":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const PostAuthLogin = {"body":{"type":"object","properties":{"email":{"type":"string","description":"The email of the user"},"password":{"type":"string","description":"The password of the user"},"longExpiration":{"type":"boolean","description":"Whether to keep the user logged in for a long time"}},"$schema":"http://json-schema.org/draft-04/schema#"},"response":{"200":{"type":"object","properties":{"status":{"type":"string","examples":["success"]},"token":{"type":"string","description":"The JWT token for the user"}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const PostAuthSignup = {"body":{"type":"object","properties":{"email":{"type":"string","description":"The email of the user"},"password":{"type":"string","description":"The password of the user"},"passwordValidation":{"type":"string","description":"Password validation field"},"firstName":{"type":"string","description":"The first name of the user"},"lastName":{"type":"string","description":"The last name of the user"}},"$schema":"http://json-schema.org/draft-04/schema#"},"response":{"200":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const PostUsersIdFollow = {"metadata":{"allOf":[{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the user to follow","$schema":"http://json-schema.org/draft-04/schema#"}},"required":["id"]}]},"response":{"200":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"},"posts":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}},"followed":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"followers":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const UnlikePost = {"metadata":{"allOf":[{"type":"object","properties":{"id":{"type":"integer","$schema":"http://json-schema.org/draft-04/schema#","description":"ID of the post"}},"required":["id"]}]},"response":{"200":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const UpdatePost = {"body":{"type":"object","properties":{"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"}},"$schema":"http://json-schema.org/draft-04/schema#"},"metadata":{"allOf":[{"type":"object","properties":{"id":{"type":"integer","$schema":"http://json-schema.org/draft-04/schema#","description":"ID of the post"}},"required":["id"]}]},"response":{"200":{"type":"object","properties":{"id":{"type":"integer","description":"Post ID"},"title":{"type":"string","description":"Post title"},"content":{"type":"string","description":"Post content"},"createdAt":{"type":"string","description":"Post creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}},"comments":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Comment ID"},"content":{"type":"string","description":"Comment content"},"createdAt":{"type":"string","description":"Comment creation date"},"createdBy":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}},"likedBy":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"User ID"},"firstName":{"type":"string","description":"User first name"},"lastName":{"type":"string","description":"User last name"}}}}}}}},"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
export { CommentPost, CreatePost, DeletePost, DeleteUsersIdFollow, GetAllPosts, GetAuthLogout, GetFollowedPosts, GetPost, GetUsers, GetUsersId, GetUsersMe, LikePost, PostAuthLogin, PostAuthSignup, PostUsersIdFollow, UnlikePost, UpdatePost }