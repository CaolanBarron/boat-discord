use rusqlite::{params, Connection, Result};

#[derive(Debug)]
enum Location {
    EAST,
    WEST,
}

#[derive(Debug)]
struct Boat {
    id: String,
    condition: u16,
    speed: u16,
    x_coord: f16,
    y_coord: f16,
}

impl Boat {
    fn create(id: String) {
        let conn = Connection::open_in_memory()?;

        let mut stmt = conn.prepare("SELECT * FROM boat WHERE id = ?1", (&id))?;

        let boat_iter = stmt.query_map([], |row| {
            Ok(Boat {
                id: row.get(0)?,
                condition: row.get(1)?,
                speed: row.get(2)?,
                x_coord: row.get(3)?,
                y_coord: row.get(4)?,
            });
        })?;

        for boat in boat_iter {
            println!("Found boat {:?}", boat.unwrap());
        }
    }

    fn get(id: String) -> Self {}
}

#[cfg(test)]
mod tests {
    #[test]
    fn creation() {
        Boat::create("testid");
    }
}
