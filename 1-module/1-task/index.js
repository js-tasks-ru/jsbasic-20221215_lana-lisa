function factorial(n) {
    if (n == 0) {
        return 1;
    }
    else {
        let i = 0;
        let res = n;
        while (i < n-1) {
            res *= n-(1+i)
            i += 1
        }
        return res;
    }
}