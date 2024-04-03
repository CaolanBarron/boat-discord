#[derive(Debug)]
enum Location {
    EAST,
    WEST,
}

#[derive(Debug)]
struct Boat {
    name: String,
    traveling: bool,
    current: Location,
    destination: Location,
}
