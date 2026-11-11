// ==========================================
// ページ読み込み時の初期化
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('ページ読み込み完了');

    // パーティスロットを初期化
    initializePartySlots();
    // パーティリセットボタン
    document.getElementById('resetMyPartyBtn').addEventListener('click', function() {
        clearPartyFields('myPokemon');
    });
    document.getElementById('resetEnemyPartyBtn').addEventListener('click', function() {
        clearPartyFields('enemyPokemon');
    });
    // パーティ全解除ボタン
    document.querySelectorAll('.clear-party-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            clearPartyFields(button.dataset.party);
        });
    });

    // パーティ分析ボタン
    document.getElementById('analyzeBtn')
        .addEventListener('click', analyzeParty);

    // 攻撃タイプ補完チェッカーを初期化
    initializeAttackTypeChecker();

    // ページ切り替え
    document.getElementById('partyPageBtn')
        .addEventListener('click', function() {
            showPage('party');
        });

    document.getElementById('attackPageBtn')
        .addEventListener('click', function() {
            showPage('attack');
        });

    // 攻撃タイプ補完の分析ボタン
    document.getElementById('clearAttackBtn').addEventListener('click', clearAttackTypes);
    document.getElementById('checkAttackBtn')
        .addEventListener('click', analyzeAttackTypeComplement);

});


// ==========================================
// ページ切り替え
// ==========================================

function showPage(page) {

    const partyPage = document.getElementById('partyPage');
    const attackPage = document.getElementById('attackPage');

    const partyPageBtn = document.getElementById('partyPageBtn');
    const attackPageBtn = document.getElementById('attackPageBtn');


    if (page === 'party') {

        partyPage.style.display = 'block';
        attackPage.style.display = 'none';

        partyPageBtn.classList.add('active');
        attackPageBtn.classList.remove('active');

    }


    if (page === 'attack') {

        partyPage.style.display = 'none';
        attackPage.style.display = 'block';

        partyPageBtn.classList.remove('active');
        attackPageBtn.classList.add('active');

    }

}

function clearPartyFields(prefix) {
    for (let i = 0; i < 6; i++) {
        const checkbox = document.getElementById(`${prefix}${i}-check`);
        const pokemonInput = document.getElementById(`${prefix}${i}-pokemon-search`);
        const type1Input = document.getElementById(`${prefix}${i}-type1-search`);
        const type2Input = document.getElementById(`${prefix}${i}-type2-search`);
        const abilityInput = document.getElementById(`${prefix}${i}-ability-search`);

        if (checkbox) {
            checkbox.checked = true;
            const slot = checkbox.closest('.pokemon-slot');
            if (slot) {
                slot.classList.remove('disabled');
            }
        }

        if (pokemonInput) {
            pokemonInput.value = '';
            pokemonInput.dataset.pokemon = '';
        }

        if (type1Input) {
            type1Input.value = '';
            type1Input.dataset.type = '';
            type1Input.className = 'type-search-input';
        }

        if (type2Input) {
            type2Input.value = '';
            type2Input.dataset.type = '';
            type2Input.className = 'type-search-input';
        }

        if (abilityInput) {
            abilityInput.value = '';
            abilityInput.dataset.ability = '';
        }
    }
}


// ==========================================
// パーティスロットを初期化
// ==========================================

function initializePartySlots() {

    console.log('パーティスロット初期化中...');

    const myPartyDiv = document.getElementById('myParty');
    const enemyPartyDiv = document.getElementById('enemyParty');


    // 自分のパーティ
    for (let i = 0; i < 6; i++) {

        myPartyDiv.appendChild(
            createPokemonSlot(`myPokemon${i}`)
        );

    }


    // 相手のパーティ
    for (let i = 0; i < 6; i++) {

        enemyPartyDiv.appendChild(
            createPokemonSlot(`enemyPokemon${i}`)
        );

    }


    console.log('パーティスロット作成完了');

}


// ==========================================
// ポケモンスロットを作成
// ==========================================

function createPokemonSlot(id) {

    const div = document.createElement('div');

    div.className = 'pokemon-slot';


    // チェックボックス

    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.id = id + '-check';
    checkbox.checked = true;


    checkbox.addEventListener('change', function() {

        if (!checkbox.checked) {

            div.classList.add('disabled');

        } else {

            div.classList.remove('disabled');

        }

    });


    // ポケモン入力

    const pokemonContainer = document.createElement('div');

    pokemonContainer.className =
        'type-input-container pokemon-input-container';

    pokemonContainer.id =
        id + '-pokemon-container';


    const pokemonInput = document.createElement('input');

    pokemonInput.type = 'text';
    pokemonInput.id = id + '-pokemon-search';
    pokemonInput.className = 'type-search-input';
    pokemonInput.placeholder = 'ポケモンを選択';
    pokemonInput.autocomplete = 'off';


    const pokemonDropdown = document.createElement('div');

    pokemonDropdown.className = 'type-dropdown-list';

    pokemonDropdown.id =
        id + '-pokemon-dropdown';


    createPokemonDropdown(
        pokemonInput,
        pokemonDropdown,
        id
    );


    pokemonContainer.appendChild(pokemonInput);
    pokemonContainer.appendChild(pokemonDropdown);


    // タイプ1

    const type1Container = document.createElement('div');

    type1Container.className =
        'type-input-container';

    type1Container.id =
        id + '-type1-container';


    const type1Input = document.createElement('input');

    type1Input.type = 'text';
    type1Input.id = id + '-type1-search';
    type1Input.className = 'type-search-input';
    type1Input.placeholder = 'タイプ1';
    type1Input.autocomplete = 'off';


    const type1Dropdown = document.createElement('div');

    type1Dropdown.className =
        'type-dropdown-list';

    type1Dropdown.id =
        id + '-type1-dropdown';


    createTypeDropdown(
        type1Input,
        type1Dropdown,
        id + '-type1'
    );
    type1Input.addEventListener('input', function() {
    updateTypeInputColor(type1Input);
});


    type1Container.appendChild(type1Input);
    type1Container.appendChild(type1Dropdown);


    // タイプ2

    const type2Container = document.createElement('div');

    type2Container.className =
        'type-input-container';

    type2Container.id =
        id + '-type2-container';


    const type2Input = document.createElement('input');

    type2Input.type = 'text';
    type2Input.id = id + '-type2-search';
    type2Input.className = 'type-search-input';
    type2Input.placeholder = 'タイプ2';
    type2Input.autocomplete = 'off';


    const type2Dropdown = document.createElement('div');

    type2Dropdown.className =
        'type-dropdown-list';

    type2Dropdown.id =
        id + '-type2-dropdown';


    createTypeDropdown(
        type2Input,
        type2Dropdown,
        id + '-type2'
    );
    type2Input.addEventListener('input', function() {
    updateTypeInputColor(type2Input);
});


    type2Container.appendChild(type2Input);
    type2Container.appendChild(type2Dropdown);


        // 特性
    const abilityContainer = document.createElement('div');
    abilityContainer.className = 'type-input-container';
    abilityContainer.id = id + '-ability-container';
    const abilityInput = document.createElement('input');
    abilityInput.type = 'text';
    abilityInput.id = id + '-ability-search';
    abilityInput.className = 'type-search-input';
    abilityInput.placeholder = '特性';
    abilityInput.autocomplete = 'off';
    const abilityDropdown = document.createElement('div');
    abilityDropdown.className = 'type-dropdown-list';
    abilityDropdown.id = id + '-ability-dropdown';
    createAbilityDropdown(abilityInput, abilityDropdown, id);
    abilityContainer.appendChild(abilityInput);
    abilityContainer.appendChild(abilityDropdown);
    // スロットに追加
    div.appendChild(checkbox);
    div.appendChild(pokemonContainer);
    const typeAbilityContainer = document.createElement('div');
    typeAbilityContainer.className = 'type-ability-row';
    typeAbilityContainer.appendChild(type1Container);
    typeAbilityContainer.appendChild(type2Container);
    typeAbilityContainer.appendChild(abilityContainer);
    div.appendChild(typeAbilityContainer);


    return div;

}


// ==========================================
// タイプドロップダウン
// ==========================================

function createTypeDropdown(input, dropdown, dataId) {

    input.addEventListener('focus', function() {

        showTypeDropdown(
            dropdown,
            input.value
        );

        dropdown.style.display = 'block';

    });


    input.addEventListener('input', function() {

        showTypeDropdown(
            dropdown,
            input.value
        );

    });


    input.addEventListener('blur', function() {

        setTimeout(function() {

            dropdown.style.display = 'none';

        }, 200);

    });

}


// ==========================================
// ポケモンドロップダウン
// ==========================================

function createPokemonDropdown(input, dropdown, id) {

    input.addEventListener('focus', function() {

        showPokemonDropdown(
            dropdown,
            input.value
        );

        dropdown.style.display = 'block';

    });


    input.addEventListener('input', function() {

        showPokemonDropdown(
            dropdown,
            input.value
        );

    });


    input.addEventListener('blur', function() {

        setTimeout(function() {

            dropdown.style.display = 'none';

        }, 200);

    });

}
// ==========================================
// 特性ドロップダウン
// ==========================================
function createAbilityDropdown(input, dropdown, id) {
    input.addEventListener('focus', function() {
        showAbilityDropdown(
            dropdown,
            input.value,
            id,
            input
        );
        dropdown.style.display = 'block';
    });
    input.addEventListener('input', function() {
        showAbilityDropdown(
            dropdown,
            input.value,
            id,
            input
        );
    });
    input.addEventListener('blur', function() {
        setTimeout(function() {
            dropdown.style.display = 'none';
        }, 200);
    });
}
// ==========================================
// 特性ドロップダウンを表示
// ==========================================
function showAbilityDropdown(dropdown, searchText, id, input) {
    dropdown.innerHTML = '';
    const pokemonInput = document.getElementById(
        id + '-pokemon-search'
    );
    if (!pokemonInput || !pokemonInput.value) {
        return;
    }
    const pokemonName = pokemonInput.value.trim();
    const pokemonInfo = pokemonDatabase[pokemonName];
    if (!pokemonInfo || !pokemonInfo.abilities) {
        return;
    }
    const searchHiragana =
        toHiragana(searchText.toLowerCase());
    pokemonInfo.abilities.forEach(function(ability) {
        const abilityHiragana =
            toHiragana(ability.toLowerCase());
        if (
            abilityHiragana.includes(searchHiragana) ||
            ability.includes(searchText)
        ) {
            const item = document.createElement('div');
            item.className = 'type-dropdown-item';
            item.textContent = ability;
            item.addEventListener('mousedown', function() {
                input.value = ability;
                input.dataset.ability = ability;
                dropdown.style.display = 'none';
            });
            dropdown.appendChild(item);
        }
    });
}


// ==========================================
// ポケモンドロップダウンを表示
// ==========================================

function showPokemonDropdown(dropdown, searchText) {

    dropdown.innerHTML = '';


    const searchHiragana =
        toHiragana(searchText.toLowerCase());


    pokemonList.forEach(function(pokemon) {

        const pokemonHiragana =
            toHiragana(pokemon.toLowerCase());


        if (
            pokemonHiragana.includes(searchHiragana) ||
            pokemon.includes(searchText)
        ) {

            const item =
                document.createElement('div');


            item.className =
                'type-dropdown-item';

            item.textContent = pokemon;


            item.addEventListener(
                'mousedown',
                function() {

                    const input =
                        dropdown.previousElementSibling;


                    input.value = pokemon;

                    input.dataset.pokemon =
                        pokemon;


                    dropdown.style.display =
                        'none';


                    updatePokemonTypesFromSearch(
                        input.id.replace(
                            '-pokemon-search',
                            ''
                        ),
                        pokemon
                    );

                }
            );


            dropdown.appendChild(item);

        }

    });

}


// ==========================================
// ポケモン選択時にタイプを更新
// ==========================================

function updatePokemonTypesFromSearch(
    id,
    pokemonName
) {

    if (
        pokemonName &&
        pokemonDatabase[pokemonName]
    ) {

        const pokemonInfo =
            pokemonDatabase[pokemonName];


        const types =
            pokemonInfo.types;


        const type1Input =
            document.getElementById(
                id + '-type1-search'
            );


        type1Input.value =getTypeNameJP(types[0]);
        type1Input.dataset.type =types[0];
        type1Input.className = `type-search-input type-badge type-${types[0]}`;


        const type2Input =
            document.getElementById(
                id + '-type2-search'
            );


        if (types[1]) {

            type2Input.value =getTypeNameJP(types[1]);
            type2Input.dataset.type =types[1];
            type2Input.className =`type-search-input type-badge type-${types[1]}`;

        } else {

            type2Input.value = '';
            type2Input.dataset.type = '';
            type2Input.className = 'type-search-input';

        }
                const abilityInput =
            document.getElementById(
                id + '-ability-search'
            );
        if (abilityInput) {
            abilityInput.value = '';
            abilityInput.dataset.ability = '';
        }

    }

}


// ==========================================
// タイプドロップダウンを表示
// ==========================================

function showTypeDropdown(
    dropdown,
    searchText
) {

    dropdown.innerHTML = '';


    const searchHiragana =
        toHiragana(searchText.toLowerCase());


    typeList.forEach(function(type) {

        const typeHiragana =
            toHiragana(type.jp.toLowerCase());


        if (
            typeHiragana.includes(searchHiragana) ||
            type.jp.includes(searchText)
        ) {

            const item =
                document.createElement('div');


            item.className =
                'type-dropdown-item';

            item.textContent =
                type.jp;


            item.addEventListener(
                'click',
                function() {

                    const input =
                        dropdown.previousElementSibling;


                    input.value =
                        type.jp;
                    input.dataset.type =
                        type.en;
                    input.className =
    `type-search-input type-badge type-${type.en}`;


                    dropdown.style.display =
                        'none';

                }
            );


            dropdown.appendChild(item);

        }

    });

}

function updateTypeInputColor(input) {
    const type = typeData.find(function(t) {
        return t.jp === input.value;
    });
    input.className =
        'type-search-input';
    if (type) {
        input.dataset.type =
            type.en;
        input.className =
            `type-search-input type-badge type-${type.en}`;
    } else {
        input.dataset.type =
            '';
    }
}
// ==========================================
// パーティを分析
// ==========================================

function analyzeParty() {
    const myParty = getPartyData('myPokemon');
    const enemyParty = getPartyData('enemyPokemon');

    if (myParty.length === 0 && enemyParty.length === 0) {
        showResult(
            '<div class="warning">⚠️ 自分または相手のパーティに1匹以上入力してください。</div>'
        );
        return;
    }

    const myAnalysis = myParty.length > 0
        ? analyzeOwnPartyWeakness(myParty)
        : null;

    const enemyAnalysis = enemyParty.length > 0
        ? analyzeOwnPartyWeakness(enemyParty)
        : null;

    displayAnalysisResult(
        myAnalysis,
        myParty,
        enemyAnalysis,
        enemyParty
    );
}


// ==========================================
// パーティデータを取得
// ==========================================

function getPartyData(prefix) {

    const party = [];


    for (let i = 0; i < 6; i++) {

        const checkbox =
            document.getElementById(
                `${prefix}${i}-check`
            );


        const pokemonInput =
            document.getElementById(
                `${prefix}${i}-pokemon-search`
            );


        const type1Input =
            document.getElementById(
                `${prefix}${i}-type1-search`
            );


        const type2Input =
            document.getElementById(
                `${prefix}${i}-type2-search`
            );


        // 念のため存在確認

        if (
            !checkbox ||
            !pokemonInput ||
            !type1Input ||
            !type2Input
        ) {
            continue;
        }


        const pokemonName =
            pokemonInput.value.trim();


        const type1 =
            type1Input.dataset.type || '';


        const type2 =
            type2Input.dataset.type || '';


        // チェックOFFなら除外

        if (!checkbox.checked) {
            continue;
        }


        // ポケモンが選択されている場合

        if (
            pokemonName &&
            pokemonDatabase[pokemonName]
        ) {

            const pokemonInfo =
                pokemonDatabase[pokemonName];


            const abilityInput =
                document.getElementById(
                    `${prefix}${i}-ability-search`
                );
            const ability =
                abilityInput ?
                abilityInput.dataset.ability || '' :
                '';
            party.push({
                name: pokemonName,
                types: pokemonInfo.types,
                ability: ability,
                index: i
            });

        }


        // タイプだけ入力されている場合

        else if (type1) {

            const types = [type1];


            if (
                type2 &&
                type2 !== type1
            ) {

                types.push(type2);

            }


            party.push({

                name:
                    `(${types.map(
                        function(t) {
                            return getTypeNameJP(t);
                        }
                    ).join('/')})`,

                types: types,
                index: i

            });

        }

    }


    return party;

}


// ==========================================
// パーティの一貫性を分析
// ==========================================

function analyzeOwnPartyWeakness(party) {

    const analysis = {

        typeWeakness: {},

        typeStatus: {}

    };


    // タイプごとの弱点情報

    party.forEach(function(pokemon) {

        pokemon.types.forEach(function(defType) {

            if (!analysis.typeWeakness[defType]) {

                analysis.typeWeakness[defType] = {

                    type: defType,

                    weakness: []

                };

            }

        });

    });


    // 全18攻撃タイプを調べる

    Object.keys(typeChart).forEach(
        function(attackType) {


            // パーティに半減以下がいるか

            const canResist =
                party.some(function(pokemon) {

                    const multiplier =
                        getTypeMultiplierWithAbility(
                            attackType,
                            pokemon
                        );


                    return multiplier <= 0.5;

                });


            // パーティに弱点がいるか

            const hasWeakness =
                party.some(function(pokemon) {

                    const multiplier =
                        getTypeMultiplierWithAbility(
                            attackType,
                            pokemon
                        );


                    return multiplier >= 2;

                });


            // 全員等倍か

            const allNeutral =
                party.length > 0 &&
                party.every(function(pokemon) {

                    return getTypeMultiplierWithAbility(
                        attackType,
                        pokemon
                    ) === 1;

                });


            analysis.typeStatus[attackType] = {

                type: attackType,

                isConsistent:
                    (hasWeakness || allNeutral) &&
                    !canResist,

                consistencyType:
                    allNeutral
                        ? 'neutral'
                        : 'weakness'

            };

        }
    );


    // 各単タイプの弱点

    Object.keys(typeChart).forEach(
        function(defType) {

            const weakness = [];


            Object.keys(typeChart).forEach(
                function(attackType) {

                    const multiplier =
                        getTypeMultiplier(
                            attackType,
                            [defType]
                        );


                    if (multiplier >= 2) {

                        weakness.push(
                            attackType
                        );

                    }

                }
            );


            if (weakness.length > 0) {

                analysis.typeWeakness[defType] = {

                    type: defType,

                    weakness: weakness

                };

            }

        }
    );


    return analysis;

}


// ==========================================
// 複合タイプの最終倍率を計算
// ==========================================
function getTypeMultiplierWithAbility(
    attackType,
    pokemon
) {
    const multiplier =
        getTypeMultiplier(
            attackType,
            pokemon.types
        );
    const ability = pokemon.ability;
    if (
        (
            ability === 'ふゆう' ||
            ability === 'どしょく'
        ) &&
        attackType === 'ground'
    ) {
        return 0;
    }
    if (
        (
            ability === 'ちょすい' ||
            ability === 'よびみず'
        ) &&
        attackType === 'water'
    ) {
        return 0;
    }
    if (
        (
            ability === 'ひらいしん' ||
            ability === 'ちくでん' ||
            ability === 'でんきエンジン'
        ) &&
        attackType === 'electric'
    ) {
        return 0;
    }
    if (
        ability === 'もらいび' &&
        attackType === 'fire'
    ) {
        return 0;
    }
    if (
        ability === 'そうしょく' &&
        attackType === 'grass'
    ) {
        return 0;
    }
    return multiplier;
}
function getTypeMultiplier(
    attackType,
    defenseTypes
) {

    let multiplier = 1;


    defenseTypes.forEach(
        function(defenseType) {

            const attackData =
                typeChart[attackType];


            if (!attackData) {
                return;
            }


            // 無効

            if (
                attackData.noEffect.includes(
                    defenseType
                )
            ) {

                multiplier *= 0;

            }


            // 半減

            else if (
                attackData.notVeryEffective.includes(
                    defenseType
                )
            ) {

                multiplier *= 0.5;

            }


            // 弱点

            else if (
                attackData.superEffective.includes(
                    defenseType
                )
            ) {

                multiplier *= 2;

            }

        }
    );


    return multiplier;

}


// ==========================================
// パーティ分析結果を表示
// ==========================================

function displayAnalysisResult(myAnalysis, myParty, enemyAnalysis, enemyParty) {
    let html = '<div class="result-title">📊 パーティ分析結果</div>';

    html += '<div class="result-tabs">';
    html += '<button class="result-tab-btn active" data-tab="full-party">📊 全パーティ分析</button>';
    html += '<button class="result-tab-btn" data-tab="3combo">🎲 3体組み合わせ</button>';
    html += '</div>';

    const initialSide = myParty.length > 0 ? 'my' : 'enemy';
    const initialComboSide = myParty.length >= 3 ? 'my' :
        enemyParty.length >= 3 ? 'enemy' : initialSide;

    html += '<div class="result-tab-content active" id="tab-full-party">';
    html += createSideTabs('full', initialSide);
    html += createSideContent('full-my', myParty, myAnalysis, '自分');
    html += createSideContent('full-enemy', enemyParty, enemyAnalysis, '相手');
    html += '</div>';

    html += '<div class="result-tab-content" id="tab-3combo">';
    html += createSideTabs('combo', initialComboSide);

    html += `<div class="analysis-side-content ${initialComboSide === 'my' ? 'active' : ''}" data-side-content="combo-my">
        ${displayThreePokemonCombinations(myParty, '自分')}
    </div>`;

    html += `<div class="analysis-side-content ${initialComboSide === 'enemy' ? 'active' : ''}" data-side-content="combo-enemy">
        ${displayThreePokemonCombinations(enemyParty, '相手')}
    </div>`;

    html += '</div>';

    showResult(html);
    setupResultTabs();
}

function createSideTabs(group, initialSide) {
    return `
        <div class="analysis-side-tabs" data-side-group="${group}">
            <button class="analysis-side-btn ${initialSide === 'my' ? 'active' : ''}" data-side="${group}-my">👤 自分のパーティ</button>
            <button class="analysis-side-btn ${initialSide === 'enemy' ? 'active' : ''}" data-side="${group}-enemy">🎯 相手のパーティ</button>
        </div>
    `;
}

function createSideContent(id, party, analysis, label) {
    return `
        <div class="analysis-side-content ${id === 'full-my' ? 'active' : ''}" data-side-content="${id}">
            ${displaySinglePartyAnalysis(label, party, analysis)}
        </div>
    `;
}

function displaySinglePartyAnalysis(label, party, analysis) {
    if (party.length === 0) {
        return `<div class="warning">⚠️ ${label}のパーティには入力がありません。</div>`;
    }

    let html = '<div class="result-section">';
    html += `<h4>${label}のパーティ</h4><div class="result-content">`;

    party.forEach(function(pokemon) {
        const typeStr = pokemon.types.map(function(type) {
            return `<span class="type-badge type-${type}">${getTypeNameJP(type)}</span>`;
        }).join(' / ');

        html += `<div>• ${pokemon.name} (${typeStr})</div>`;
    });

    html += '</div></div>';
    html += displayTypeWeaknessTable(label, analysis);
    return html;
}

// 3体組み合わせ
function displayThreePokemonCombinations(party, label) {
    if (party.length < 3) {
        return `<div class="result-section">
            <h4>🎲 ${label}の3体組み合わせ</h4>
            <div class="warning">
                ⚠️ 3体組み合わせには3匹以上必要です。現在は${party.length}匹です。
            </div>
        </div>`;
    }

    const combinations = [];

    for (let i = 0; i < party.length; i++) {
        for (let j = i + 1; j < party.length; j++) {
            for (let k = j + 1; k < party.length; k++) {
                const combo = [party[i], party[j], party[k]];
                const analysis = analyzeOwnPartyWeakness(combo);

                const consistentTypes = Object.keys(analysis.typeStatus).filter(function(type) {
                    return analysis.typeStatus[type].isConsistent;
                });

                combinations.push({
                    names: combo.map(function(p) {
                        return p.name;
                    }),
                    types: consistentTypes
                });
            }
        }
    }

    combinations.sort(function(a, b) {
        return a.types.length - b.types.length;
    });

    let html = '<div class="result-section">';
    html += `<h4>🎲 ${label}の3体組み合わせ</h4>`;
    html += '<p>一貫タイプが少ない順に表示しています。</p>';

    combinations.forEach(function(combo, index) {
        html += '<div class="combo-result">';
        html += `<strong>${index + 1}. ${combo.names.join(' + ')}</strong>`;

        if (combo.types.length === 0) {
            html += '<div>✅ 一貫タイプなし</div>';
        } else {
            html += `<div>⚠️ 一貫タイプ ${combo.types.length}つ: `;
            html += combo.types.map(function(type) {
                return `<span class="type-badge type-${type}">${getTypeNameJP(type)}</span>`;
            }).join(' ');
            html += '</div>';
        }

        html += '</div>';
    });

    html += '</div>';
    return html;
}

// タブ切り替え
function setupResultTabs() {
    const result = document.getElementById('analysisResult');

    result.querySelectorAll('.result-tab-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            result.querySelectorAll('.result-tab-btn').forEach(function(btn) {
                btn.classList.remove('active');
            });

            result.querySelectorAll('.result-tab-content').forEach(function(content) {
                content.classList.remove('active');
            });

            button.classList.add('active');

            const content = result.querySelector('#tab-' + button.dataset.tab);
            if (content) content.classList.add('active');
        });
    });

    result.querySelectorAll('.analysis-side-tabs').forEach(function(tabGroup) {
        const group = tabGroup.dataset.sideGroup;

        tabGroup.querySelectorAll('.analysis-side-btn').forEach(function(button) {
            button.addEventListener('click', function() {
                tabGroup.querySelectorAll('.analysis-side-btn').forEach(function(btn) {
                    btn.classList.remove('active');
                });

                button.classList.add('active');

                const parent = tabGroup.parentElement;

                parent.querySelectorAll(`[data-side-content^="${group}-"]`).forEach(function(content) {
                    content.classList.remove('active');
                });

                const target = parent.querySelector(`[data-side-content="${button.dataset.side}"]`);
                if (target) target.classList.add('active');
            });
        });
    });
}

// ==========================================
// 一貫タイプを表示
// ==========================================

function displayTypeWeaknessTable(
    label,
    analysis
) {

    let html =
        '<div class="result-section">';


    html +=
        `<h4>🛡️ ${label}のパーティの一貫タイプ</h4>`;


    const consistentTypes =
        Object.keys(
            analysis.typeStatus
        ).filter(function(type) {

            return analysis
                .typeStatus[type]
                .isConsistent;

        });


    if (consistentTypes.length === 0) {

        html +=
            '<div class="success">' +
            '✅ 一貫しているタイプはありません' +
            '</div>';

    }


    else {

        html +=
            '<table class="type-table">';

        html +=
            '<thead><tr>';

        html +=
            '<th>攻撃タイプ</th>';

        html +=
            '<th>一貫の種類</th>';

        html +=
            '</tr></thead>';

        html +=
            '<tbody>';


        consistentTypes.forEach(
            function(type) {

                const status =
                    analysis
                        .typeStatus[type]
                        .consistencyType;


                html += '<tr>';

                html +=
                    `<td class="type-name">` +
                    `<span class="type-badge type-${type}">${getTypeNameJP(type)}</span>` +
                    `</td>`;


                if (status === 'neutral') {

                    html +=
                        '<td>等倍一貫</td>';

                } else {

                    html +=
                        '<td>⚠️ 弱点一貫</td>';

                }


                html += '</tr>';

            }
        );


        html += '</tbody>';
        html += '</table>';

    }


    html += '</div>';


    return html;

}


// ==========================================
// 結果を表示
// ==========================================

function showResult(html) {

    const resultDiv =
        document.getElementById(
            'analysisResult'
        );


    resultDiv.innerHTML = html;

    resultDiv.classList.add('show');


    resultDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

}


// ==========================================
// 攻撃タイプ補完チェッカー
// ==========================================

function getAttackModeSetting() {
    const toggle = document.getElementById('attackModeToggle');
    return toggle ? toggle.checked : false;
}

function updateAttackModeLabel() {
    const modeText = document.getElementById('attackModeText');
    const isSuperEffectiveMode = getAttackModeSetting();

    if (!modeText) {
        return;
    }

    if (isSuperEffectiveMode) {
        modeText.textContent = '抜群（2倍以上）にならないタイプ';
    } else {
        modeText.textContent = '等倍（1倍以上）にならないタイプ';
    }
}

// 18タイプのチェックボックスを作る


function initializeAttackTypeChecker() {
    const container = document.getElementById('attackTypeChecks');
    if (!container) {
        return;
    }
    container.innerHTML = '';
    const imageFiles = {
        'あく': 'あく.png',
        'いわ': 'いわ.png',
        'かくとう': 'かくとう.png',
        'くさ': 'くさ.png',
        'こおり': 'こおり.png',
        'じめん': 'じめん.png',
        'でんき': 'でんき.png',
        'どく': 'どく.png',
        'はがね': 'はがね.png',
        'ひこう': 'ひこう.png',
        'ほのお': 'ほのお.png',
        'みず': 'みず.png',
        'むし': 'むし.png',
        'エスパー': 'エスパー.png',
        'ゴースト': 'ゴースト.png',
        'ドラゴン': 'ドラゴン.png',
        'ノーマル': 'ノーマル.png',
        'フェアリー': 'フェアリー.png'
    };
    typeList.forEach(function(type) {
        const label = document.createElement('label');
        label.className = 'attack-type-image-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = type.en;
        checkbox.dataset.type = type.en;
        checkbox.setAttribute('aria-label', type.jp);
        const image = document.createElement('img');
        image.src = 'images/types/' + (imageFiles[type.jp] || type.jp + '.png');
        image.alt = type.jp;
        image.className = 'attack-type-image-file';
        image.loading = 'lazy';
        label.appendChild(checkbox);
        label.appendChild(image);
        label.classList.add('not-selected');
        checkbox.addEventListener('change', function() {
            label.classList.toggle('not-selected', !checkbox.checked);
        });
        container.appendChild(label);
    });
    container.classList.add('attack-type-image-grid');
}
// ==========================================
// 攻撃タイプ補完を分析
// ==========================================


function analyzeAttackTypeComplement() {
    console.log('攻撃タイプ補完分析開始');

    const checkedTypes = [];
    document.querySelectorAll(
        '#attackTypeChecks input[type="checkbox"]:checked'
    ).forEach(function(checkbox) {
        checkedTypes.push(checkbox.value);
    });

    const resultDiv = document.getElementById('attackAnalysisResult');

    if (checkedTypes.length === 0) {
        resultDiv.innerHTML =
            '<div class="warning">⚠️ 攻撃タイプを1つ以上選択してください</div>';
        resultDiv.classList.add('show');
        return;
    }

    // 調べる防御タイプの組み合わせを作成
    const defenseTypesList = [];

    typeList.forEach(function(type) {
        defenseTypesList.push({
            types: [type.en],
            ability: ''
        });
    });

    for (let i = 0; i < typeList.length; i++) {
        for (let j = i + 1; j < typeList.length; j++) {
            defenseTypesList.push({
                types: [typeList[i].en, typeList[j].en],
                ability: ''
            });
        }
    }

    // タイプ相性を無効にする特性
    const specialAbilities = [
        'ふゆう',
        'どしょく',
        'ちょすい',
        'よびみず',
        'ひらいしん',
        'ちくでん',
        'でんきエンジン',
        'もらいび',
        'そうしょく'
    ];

    // 特性による無効化も調べる
    const specialTypeKeys = [];

    Object.keys(pokemonDatabase).forEach(function(pokemonName) {
        const pokemonInfo = pokemonDatabase[pokemonName];

        if (!pokemonInfo.types || !pokemonInfo.abilities) {
            return;
        }

        pokemonInfo.abilities.forEach(function(ability) {
            if (!specialAbilities.includes(ability)) {
                return;
            }

            const typeKey = pokemonInfo.types.slice().sort().join('/');
            const key = typeKey + '|' + ability;

            if (!specialTypeKeys.includes(key)) {
                specialTypeKeys.push(key);

                defenseTypesList.push({
                    types: pokemonInfo.types,
                    ability: ability
                });
            }
        });
    });

    // 等倍以上で攻撃できないタイプ・特性を抽出
    const notSuperEffective = [];

    defenseTypesList.forEach(function(defenseData) {
        const canHitTarget = checkedTypes.some(function(attackType) {
            const multiplier = getTypeMultiplierWithAbility(
                attackType,
                {
                    types: defenseData.types,
                    ability: defenseData.ability
                }
            );

            return multiplier >= 1;
        });

        if (!canHitTarget) {
            notSuperEffective.push(defenseData);
        }
    });

    // ポケモン情報を表示するHTMLを作成
    let html = `
        <div class="result-section">
            <h4>⚔️ 選択した攻撃タイプ</h4>
            <div class="selected-attack-types">
                ${checkedTypes.map(function(type) {
                    return `<span class="selected-attack-type">${getTypeNameJP(type)}</span>`;
                }).join('')}
            </div>
        </div>
    `;

    html += `
        <div class="result-section">
            <h4>🛡️ 等倍以上で通らないタイプ（${notSuperEffective.length}種類）</h4>
    `;

    if (notSuperEffective.length === 0) {
        html += '<div class="success">✅ 等倍以上で通らないタイプはありません</div>';
    } else {
        html += '<div class="defense-accordion-list">';

        notSuperEffective.forEach(function(defenseData, index) {
            const types = defenseData.types;
            const ability = defenseData.ability;

            const typeName = types.map(function(type) {
                return getTypeNameJP(type);
            }).join('・');

            const heading = ability
                ? `${typeName}（${ability}）`
                : typeName;

            // タイプと特性が完全一致するポケモンだけを検索
            const matchingPokemon = Object.keys(pokemonDatabase)
                .filter(function(pokemonName) {
                    const info = pokemonDatabase[pokemonName];

                    if (!info.types) {
                        return false;
                    }

                    const pokemonTypes = info.types.slice().sort();
                    const targetTypes = types.slice().sort();

                    // タイプの数も含めて完全一致
                    const sameTypes =
                        pokemonTypes.length === targetTypes.length &&
                        pokemonTypes.every(function(type, i) {
                            return type === targetTypes[i];
                        });

                    if (!sameTypes) {
                        return false;
                    }

                    // 特性条件がある場合は、その特性も一致させる
                    if (ability) {
                        return Array.isArray(info.abilities) &&
                            info.abilities.includes(ability);
                    }

                    return true;
                });

            // detailsは初期状態で閉じている
            html += `
                <details class="defense-accordion">
                    <summary>
                        <span class="defense-accordion-title">
                            ${heading}
                        </span>
                        <span class="defense-accordion-count">
                            ${matchingPokemon.length}匹
                        </span>
                    </summary>

                    <div class="defense-accordion-content">
            `;

            if (matchingPokemon.length === 0) {
                html += '<p>該当するポケモンは登録されていません。</p>';
            } else {
                matchingPokemon.forEach(function(pokemonName) {
                    const info = pokemonDatabase[pokemonName];

                    const pokemonTypeText = info.types.map(function(type) {
                        return getTypeNameJP(type);
                    }).join('・');

                    const abilities = info.abilities || [];

                    html += `
    <div class="candidate-pokemon">
        <strong>${pokemonName}</strong>


        <div class="candidate-pokemon-types">
            ${pokemonTypeText}
        </div>

        <div class="candidate-pokemon-abilities">
            特性：${abilities.length > 0
                ? abilities.join('、')
                : '未登録'}
        </div>
    </div>
`;
                });
            }

            html += `
                    </div>
                </details>
            `;
        });

        html += '</div>';
    }

    html += '</div>';

    resultDiv.innerHTML = html;


resultDiv.classList.add('show');

    resultDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 攻撃タイプのチェックをすべて外す

function clearAttackTypes() {
    const checkboxes = document.querySelectorAll('#attackTypeChecks input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change'));
    });
}
