function optimizeBookings(bookings) {
    let ans = [];

    if (bookings.length === 0) {
        return ans;
    }

    
    bookings.sort((a, b) => a[0] - b[0]);


    let tempint = bookings[0];

    for (let i = 1; i < bookings.length; i++) {
        let current = bookings[i];
        
        if (tempint[1] >= current[0]) {
            tempint[1] = Math.max(tempint[1], current[1]);
        } else {
            
            ans.push(tempint);
            tempint = current; 
        }
    }

    ans.push(tempint);

    return ans;
}

const n = prompt("Enter the number of bookings: ");
let bookings = [];

for (let i = 0; i < n; i++) {
    let start = prompt(`Enter the start time for booking ${i + 1}: `);
    let end = prompt(`Enter the end time for booking ${i + 1}: `);
    bookings.push([parseInt(start), parseInt(end)]);
}


let ans = optimizeBookings(bookings);

console.log("Optimized bookings: ");
ans.forEach(booking => {
    console.log(`[${booking[0]}, ${booking[1]}]`);
});
