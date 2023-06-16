import Api from "@/utils/axios";

export default {
  getAll(query = {}) {
    return Api.get(`/cuong?keyword=${query.keyword ? query.keyword : ''}&page=${query.page}${query.limit ? '&limit='+query.limit: ''}`, );
  },
  save(query = null) {
    return Api.post("/cuong", { ...query });
  }, 
   login(username,password) {
    return Api.post("/cuong/auth", {username:username,password:password});
  }, 
   update(update) {
    return Api.put("/cuong/"+update.id, {...update});
  },
  trigger() {
    return Api.post("/cuong/trigger");
  },
  delete(id) {
    return Api.delete("/cuong/"+id);
  },

};
