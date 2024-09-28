#include<bits/stdc++.h>
using namespace std;


vector<vector<int>> optimizeBookings(vector<vector<int>>& bookings) {
    vector<vector<int>> ans;

    if (bookings.empty()) {
        return ans;
    }

    
    sort(bookings.begin(), bookings.end());

    
    vector<int> tempint = bookings[0];

    for (const auto& it : bookings) {
        
        if (tempint[1] >= it[0]) {
            tempint[1] = max(tempint[1], it[1]);
        } else {
            
            ans.push_back(tempint);
            tempint = it; 
        }
    }
    
    ans.push_back(tempint);

    return ans;
}

int main() {
    int n;
    cout << "Enter the number of bookings: ";
    cin >> n;

    vector<vector<int>> bookings(n, vector<int>(2)); 
    cout << "Enter the bookings (start end): " << endl;

    for (int i = 0; i < n; i++) {
        cin >> bookings[i][0] >> bookings[i][1];
    }

    
    vector<vector<int>> ans = optimizeBookings(bookings);

    cout << "optimizeBookingsd bookings: " << endl;
    for (const auto& i : ans) {
        cout << "[" << i[0] << ", " << i[1] << "]" << endl;
    }

    return 0;
}
