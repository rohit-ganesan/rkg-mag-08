const url = 'http://127.0.0.1:8080/api/users';

const handleGetAllUsers = async () => {
    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
        });
        return await resp.json();
    } catch(err) {
        console.error("Fetch error:", err);
        return null;
    }
};

const handleSearchById = async (id) => {
    try {
        const resp = await fetch(url + `/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
        });
        return await resp.json();
    } catch(err) {
        console.error("Fetch error:", err);
        return null;
    }
};

const handleSearchByDateRange = async (startDate, endDate) => {
    try {
        const resp = await fetch(url + `/date-range?startDate=${startDate}&endDate=${endDate}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
        });
        return await resp.json();
    } catch(err) {
        console.error("Fetch error:", err);
        return null;
    }
};

const handleSearchByProfession = async (profession) => {
    try {
        const resp = await fetch(url + `/profession?profession=${profession}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
        });
        return await resp.json();
    } catch(err) {
        console.error("Fetch error:", err);
        return null;
    }
};

const handleGetAllProfessions = async () => {
    try {
        const resp = await fetch(url + '/all-professions', {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
        });
        return await resp.json();
    } catch(err) {
        console.error("Fetch error:", err);
        return null;
    }
};

const handleAddUser = async (user) => {
    try {
        const resp = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return await resp.json();
    } catch(err) {
        console.error("Fetch error:", err);
        return null;
    }
};


  module.exports = {
    handleGetAllUsers: handleGetAllUsers,
    handleGetAllProfessions: handleGetAllProfessions,
    handleSearchById: handleSearchById,
    handleSearchByDateRange: handleSearchByDateRange,
    handleSearchByProfession: handleSearchByProfession,
    handleAddUser: handleAddUser
  }