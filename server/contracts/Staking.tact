contract TonStaking {
    owner: Address;
    stakes: map<Address, Int>; // адрес → застейканная сумма
    total_staked: Int;

    init(_owner: Address) {
        self.owner = _owner;
        self.total_staked = 0;
    }

    // Пользователь отправляет TON и контракт учитывает это как стейкинг
    receive() {
        let sender = context().sender;
        let amount = context().value;

        require(amount >= ton("0.1"), "Минимум 0.1 TON для стейкинга");
        self.total_staked += amount;
    }


    // Владелец может получить информацию о стейке
    get fun get_total_staked(): Int {
        return self.total_staked;
    }

}

// Сообщение для вывода
struct Unstake {
    dummy: Bool;
}

