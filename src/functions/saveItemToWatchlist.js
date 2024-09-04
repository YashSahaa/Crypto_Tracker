import { toast } from "react-toastify";

export const saveItemToWatchlist = (e, id) => {
    e.preventDefault();
    let watchlist = JSON.parse(localStorage.getItem("watchlist"));
  
    if (watchlist) {
      if (!watchlist.includes(id)) {
        watchlist.push(id);
        toast.success("Added to the watchlist");
      } else {
        toast.error("Already added to the watchlist!");
      }
    } else {
      watchlist = [id];
      toast.success("Added to the watchlist");
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  };