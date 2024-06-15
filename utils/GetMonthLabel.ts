export const getMonthName = () => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();

    return months[monthIndex];
};