import { toast } from "react-toastify";

export const removeItemToWatchlist = (e, id, setIsCoinAdded) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to remove this coin?")) {
      let watchlist = JSON.parse(localStorage.getItem("watchlist"));
      const newList = watchlist.filter((coin) => coin != id);
      setIsCoinAdded(false);
      localStorage.setItem("watchlist", JSON.stringify(newList));
      toast.success("has been removed!");
      window.location.reload();
    } else {
      toast.error("could not be removed!");
      setIsCoinAdded(true);
    }
  };