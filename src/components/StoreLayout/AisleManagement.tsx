import React, { useEffect, useState } from "react";

interface Shelf {
  _id: string;
  items: any[];
}

interface Bay {
  _id: string;
  shelves: Shelf[];
}

interface Aisle {
  _id: string;
  name: string;
  bays: Bay[];
}

export const AisleManagement = () => {
  const [aisles, setAisles] = useState<Aisle[]>([]);
  const [expandedAisle, setExpandedAisle] = useState<string | null>(null);
  const [expandedBay, setExpandedBay] = useState<string | null>(null);

  const fetchAisles = async () => {
    try {
      const response = await fetch("/api/aisles");
      const data: Aisle[] = await response.json();
      setAisles(data);
    } catch (error) {
      console.error("Error fetching aisles data:", error);
    }
  };

  useEffect(() => {
    fetchAisles();
  }, []);

  const toggleAisle = (aisleId: string) => {
    setExpandedAisle(aisleId === expandedAisle ? null : aisleId);
    setExpandedBay(null); // Reset bay expansion when aisle changes
  };

  const toggleBay = (bayId: string) => {
    setExpandedBay(bayId === expandedBay ? null : bayId);
  };

  const deleteAisle = async (aisleId: string) => {
    try {
      await fetch(`/api/aisles/${aisleId}`, {
        method: "DELETE",
      });
      setAisles(aisles.filter((aisle) => aisle._id !== aisleId));
    } catch (error) {
      console.error("Error deleting aisle:", error);
    }
  };

  const createAisle = async () => {
    const aisleName = prompt("Enter a unique name for the new aisle:");
    if (aisleName) {
      try {
        const response = await fetch("/api/aisles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: aisleName }),
        });
        const newAisle = await response.json();
        setAisles([...aisles, newAisle]);
      } catch (error) {
        console.error("Error creating aisle:", error);
      }
    }
  };

  const deleteBay = async (aisleId: string, bayId: string) => {
    try {
      await fetch(`/api/aisles/${aisleId}/bays/${bayId}`, {
        method: "DELETE",
      });
      const updatedAisles = aisles.map((aisle) =>
        aisle._id === aisleId
          ? { ...aisle, bays: aisle.bays.filter((bay) => bay._id !== bayId) }
          : aisle
      );
      setAisles(updatedAisles);
    } catch (error) {
      console.error("Error deleting bay:", error);
    }
  };

  const addBay = async (aisleId: string) => {
    try {
      const aisle = aisles.find((a) => a._id === aisleId);
      if (!aisle) return;

      const nextBayIndex = aisle.bays.length;

      const response = await fetch(`/api/aisles/${aisleId}/bays`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: nextBayIndex }),
      });

      fetchAisles();
    } catch (error) {
      console.error("Error adding bay:", error);
    }
  };

  const deleteShelf = async (aisleId: string, bayId: string, shelfId: string) => {
    try {
      await fetch(`/api/aisles/${aisleId}/bays/${bayId}/shelves/${shelfId}`, {
        method: "DELETE",
      });
      const updatedAisles = aisles.map((aisle) =>
        aisle._id === aisleId
          ? {
              ...aisle,
              bays: aisle.bays.map((bay) =>
                bay._id === bayId
                  ? {
                      ...bay,
                      shelves: bay.shelves.filter((shelf) => shelf._id !== shelfId),
                    }
                  : bay
              ),
            }
          : aisle
      );
      setAisles(updatedAisles);
    } catch (error) {
      console.error("Error deleting shelf:", error);
    }
  };

  const addShelf = async (aisleId: string, bayId: string) => {
    try {
      const aisle = aisles.find((a) => a._id === aisleId);
      if (!aisle) return;

      const bay = aisle.bays.find((b) => b._id === bayId);
      if (!bay) return;

      const nextShelfIndex = bay.shelves.length;

      const response = await fetch(`/api/aisles/${aisleId}/bays/${bayId}/shelves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: nextShelfIndex }),
      });

      fetchAisles();
    } catch (error) {
      console.error("Error adding shelf:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Aisles</h1>
      <div className="aisle-container">
        {aisles.map((aisle) => (
          <div key={aisle._id} className="aisle">
            <button onClick={() => toggleAisle(aisle._id)} className="aisle-btn">
              {aisle.name ? `Aisle ${aisle.name}` : "Aisle Name Undefined"}
            </button>
            <button
              onClick={() => deleteAisle(aisle._id)}
              className="delete-btn"
            >
              Delete Aisle
            </button>
            {expandedAisle === aisle._id && (
              <div className="bay-container">
                <h2 className="section-title">Bays</h2>
                <div className="bay-buttons">
                  {(aisle.bays ?? []).map((bay, index) => (
                    <div key={bay._id}>
                      <button
                        onClick={() => toggleBay(bay._id)}
                        className="bay-btn"
                      >
                        {`Bay ${index + 1}`}
                      </button>
                      <button
                        onClick={() => deleteBay(aisle._id, bay._id)}
                        className="delete-btn"
                      >
                        Delete Bay
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addBay(aisle._id)}
                    className="add-btn"
                  >
                    Add Bay
                  </button>
                </div>
                {expandedBay && (
                  <div className="shelf-container">
                    <h3 className="section-title">Shelves</h3>
                    {(aisle.bays?.find((bay) => bay._id === expandedBay)
                      ?.shelves ?? []).map((shelf, index) => (
                      <div key={shelf._id}>
                        <button className="shelf-btn">
                          {`Shelf ${index + 1}`}
                        </button>
                        <button
                          onClick={() =>
                            deleteShelf(aisle._id, expandedBay, shelf._id)
                          }
                          className="delete-btn"
                        >
                          Delete Shelf
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addShelf(aisle._id, expandedBay)}
                      className="add-btn"
                    >
                      Add Shelf
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={createAisle} className="add-btn">
        Add New Aisle
      </button>
      <style jsx>{`
        .delete-btn,
        .add-btn {
          background-color: #f44336;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-left: 10px;
        }
        .delete-btn:hover {
          background-color: #e53935;
        }
        .add-btn {
          background-color: #4caf50;
        }
        .add-btn:hover {
          background-color: #43a047;
        }
      `}</style>
    </div>
  );
};
