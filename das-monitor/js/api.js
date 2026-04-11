export async function loadData() {
    const res = await fetch('data/antennas.json')
    const data = await res.json()
    return data
}