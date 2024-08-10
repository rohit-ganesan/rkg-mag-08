const handleGetAllUsers = () => {
    fetch('http://127.0.0.1:8080/api/users', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.error("Fetch error:", err);
        return null
    });
}

const handleGetAllProfessions = () => {
    fetch('http://127.0.0.1:8080/api/users/all-professions', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.error("Fetch error:", err);
        return null
    });
}

const handleSearchById = (id) => {

    if(id) {
        fetch(`http://127.0.0.1:8080/api/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.error("Fetch error:", err);
            return null
        });
    }
    
};

const handleSearchByDateRange = (startDate, endDate) => {
    if (startDate && endDate) {
        fetch(`http://127.0.0.1:8080/api/users/date-range?startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then((response) => {
            return response.json()
        }).catch((err) => {
            console.error("Fetch error:", err);
            return null
        });
    }
};

const handleSearchByProfession = (event) => {
    const selectedProfession = event.target.value;

    if (selectedProfession) {
        fetch(`http://127.0.0.1:8080/api/users/profession?profession=${selectedProfession}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then((response) => {
            return response.json()
        }).catch((err) => {
            console.error("Fetch error:", err);
            return null
        });
    }
};


  module.exports = {
    handleGetAllUsers: handleGetAllUsers,
    handleGetAllProfessions: handleGetAllProfessions,
    handleSearchById: handleSearchById,
    handleSearchByDateRange: handleSearchByDateRange,
    handleSearchByProfession: handleSearchByProfession
  }